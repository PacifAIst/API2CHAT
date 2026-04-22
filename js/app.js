document.addEventListener('DOMContentLoaded', () => {
    const d = document, 
          get = id => d.getElementById(id),
          chatInput = get('chat-input'), 
          attachBtn = get('attach-btn'), 
          fileUpload = get('file-upload'), 
          messagesArea = get('messages-area'), 
          inputArea = get('input-area'),
          settingsModal = get('settings-modal'), 
          startBtn = get('start-session-btn'), 
          apiUrl = get('api-url'), 
          apiKey = get('api-key'), 
          apiModel = get('api-model'), 
          urlGroup = get('url-group'), 
          modelGroup = get('model-group'),
          infoModal = get('info-modal');

    let sUrl = '', sKey = '', sModel = '';

    settingsModal.style.display = 'flex';

    // 1. SETUP & ENTER KEY SUPPORT
    [apiUrl, apiModel, apiKey].forEach(el => el.addEventListener('keydown', e => {
        if (e.key === 'Enter') startBtn.click();
    }));

    d.querySelectorAll('input[name="api-provider"]').forEach(r => {
        r.addEventListener('change', e => {
            const v = e.target.value, isCustom = v === 'custom';
            urlGroup.style.display = modelGroup.style.display = isCustom ? 'block' : 'none';
            
            if (isCustom) { apiUrl.value = apiModel.value = ''; }
            else if (v === 'openai') { apiUrl.value = 'https://api.openai.com/v1'; apiModel.value = 'gpt-4o-mini'; }
            else if (v === 'deepseek') { apiUrl.value = 'https://api.deepseek.com'; apiModel.value = 'deepseek-chat'; }
            else if (v === 'openrouter') { apiUrl.value = 'https://openrouter.ai/api/v1'; apiModel.value = 'openrouter/free'; }
        });
    });

    startBtn.addEventListener('click', () => {
        const u = apiUrl.value.trim(), k = apiKey.value.trim().replace(/^bearer\s+/i, ''), m = apiModel.value.trim();
        if (u && k && m) { sUrl = u; sKey = k; sModel = m; settingsModal.style.display = 'none'; inputArea.style.display = 'block'; }
        else alert("Please provide an API Key, URL, and Model.");
    });

    // 2. CONTROLS
    get('info-btn').addEventListener('click', () => infoModal.style.display = 'flex');
    get('close-info-btn').addEventListener('click', () => infoModal.style.display = 'none');
    infoModal.addEventListener('click', e => { if (e.target === infoModal) infoModal.style.display = 'none'; });

    get('restart-btn').addEventListener('click', () => {
        sUrl = sKey = sModel = apiKey.value = ''; // Zero-Knowledge Flush
        messagesArea.querySelectorAll('.message').forEach(m => m.remove());
        inputArea.style.display = 'none';
        settingsModal.style.display = 'flex';
        d.querySelector('input[value="openrouter"]').click(); // Reset radio
    });

    // 3. INPUT & FILE HANDLING
    chatInput.addEventListener('input', function() { this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'; });
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleMsg(); } });

    attachBtn.addEventListener('click', () => fileUpload.click());
    fileUpload.addEventListener('change', function() {
        if (this.files.length > 0) { get('file-name').textContent = this.files[0].name; get('file-preview').style.display = 'inline-flex'; }
    });
    get('remove-file-btn').addEventListener('click', () => { fileUpload.value = ''; get('file-preview').style.display = 'none'; });

    // 4. UI RENDERING
    function appendMsg(role, text) {
        const div = d.createElement('div'), c = d.createElement('div');
        div.className = `message ${role}-message`; c.className = 'message-content';
        
        if (role === 'ai' && typeof marked !== 'undefined') {
            c.innerHTML = marked.parse(text);
            if (typeof hljs !== 'undefined') c.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
        } else c.textContent = text;
        
        div.appendChild(c); messagesArea.appendChild(div); messagesArea.scrollTop = messagesArea.scrollHeight;
        return c;
    }

    // 5. API LOGIC
    async function handleMsg() {
        const txt = chatInput.value.trim(), file = fileUpload.files[0];
        if (!txt && !file) return;
        chatInput.value = ''; chatInput.style.height = 'auto';
        
        let p = txt;
        if (file) {
            p = `File: ${file.name}\nContent:\n${await new Promise(r => { const rd = new FileReader(); rd.onload = e => r(e.target.result); rd.readAsText(file); })}\n\nQuestion: ${txt}`;
            fileUpload.value = ''; get('file-preview').style.display = 'none';
        }
        
        appendMsg('user', txt);
        const ui = appendMsg('ai', 'Thinking...');
        if (!sUrl || !sKey) return ui.textContent = "Error: Missing API Context. Please restart session.";

        let fUrl = `${sUrl.trim().replace(/\/chat\/completions\/?$/, '').replace(/\/$/, '')}/chat/completions`;

        try {
            const res = await fetch(fUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${sKey}` },
                body: JSON.stringify({ model: sModel, messages: [{ role: 'user', content: p }] })
            });

            if (!res.ok) {
                let err = `HTTP ${res.status}: Server Error`;
                if (res.status === 400) err = "HTTP 400: Bad Request. Check if the model ID is correct and supported by the provider.";
                if (res.status === 401) err = "HTTP 401: API key is invalid or missing.";
                if (res.status === 403) err = "HTTP 403: Forbidden access to this model.";
                if (res.status === 429) err = "HTTP 429: Rate limit exceeded.";
                throw new Error(err);
            }
            ui.parentElement.remove(); 
            appendMsg('ai', (await res.json()).choices[0].message.content);
        } catch (e) { 
            ui.textContent = `❌ ${e.message}`; 
            ui.style.color = '#ff6b6b'; 
        }
    }
});
