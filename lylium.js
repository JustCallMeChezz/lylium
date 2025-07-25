// === img gen but not work yet... sad... ===
async function getImageUrl(prompt) {
  const encodedPrompt = encodeURIComponent(prompt);
  const targetUrl = `https://api.kastg.xyz/api/ai/flux?prompt=${encodedPrompt}&ratio=square&key=${apiKey}`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
  try {
    const res = await fetch(proxyUrl);
    const data = await res.json();
    const parsed = JSON.parse(data.contents);
    return parsed.result?.[0]?.url || null;
  } catch (err) {
    console.error("img gen error", err);
    return null;
  }
}

// === chat ===
function parseMarkdown(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/_(.*?)_/g, '<i>$1</i>');
}

async function sendMessage() {
  const input = document.querySelector('.footer input');
  const messageText = input.value.trim();
  if (!messageText) return;

  const content = document.querySelector('.content');
  const userMessage = document.createElement('div');
  userMessage.className = 'message right';
  userMessage.innerHTML = `<img src="/icons/user.png"><div class="bubble"><div class="text">${messageText}</div></div>`;
  content.appendChild(userMessage);
  input.value = '';

  const typing = document.createElement('div');
  typing.className = 'message';
  typing.innerHTML = `<img src="/icons/lylium.png"><div class="bubble"><div class="username">Lylium<div class="tag"><span>AI</span></div></div><div class="text"><div class="typing-dots"><span></span><span></span><span></span></div></div></div>`;
  content.appendChild(typing);
  content.scrollTop = content.scrollHeight;

  await new Promise(r => setTimeout(r, 800));

  let reply = "";
  if (messageText.startsWith('/generate')) {
    const prompt = messageText.replace('/generate', '').trim();
    const img = await getImageUrl(prompt);
    reply = img ? `<img src="${img}" style="max-width:300px; border-radius:10px;">` : "uh srry, image generator not working rn...";
  } else if (messageText.startsWith('/ui')) {
    const prompt = messageText.replace('/ui', '').trim();
    const fullPrompt = `make only a <style> tag to change the css for ${prompt}`;
    const res = await tryFetchFromApis(fullPrompt);
    if (res) {
      const styleMatch = res.match(/<style[\s\S]*?<\/style>/i);
      if (styleMatch) {
        const styleEl = document.createElement('style');
        styleEl.innerHTML = styleMatch[0].replace(/<style>|<\/style>/g, '');
        document.head.appendChild(styleEl);
      }
    }
    reply = "done!";
  } else {
    reply = await tryFetchFromApis(messageText);
    if (!reply) {
      reply = "hahh??";
      conversationHistory = "";
    } else {
      if (messageText.split(' ').length < 20 && conversationHistory.includes("hahh??")) {
        conversationHistory = `User: ${messageText}\nAI: ${reply}\n`;
      }
    }
  }

  content.removeChild(typing);

  const botMsg = document.createElement('div');
  botMsg.className = 'message';
  const parsed = parseMarkdown(reply);
  botMsg.innerHTML = `<img src="/icons/lylium.png"><div class="bubble"><div class="username">Lylium<div class="tag"><span>AI</span></div></div><div class="text" id="aiText${Date.now()}"></div></div>`;
  content.appendChild(botMsg);

  const textEl = botMsg.querySelector('.text');
  let idx = 0;
  function typeAiReply() {
    if (idx <= parsed.length) {
      textEl.innerHTML = parsed.slice(0, idx++);
      setTimeout(typeAiReply, 2);
    }
  }
  typeAiReply();
  content.scrollTop = content.scrollHeight;

  const bubbleSound = document.getElementById('bubble-sound');
  bubbleSound.play();
}

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.querySelector('.footer .send');
  const input = document.querySelector('.footer input');
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
});

// === date ===
document.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.getElementById('chat-date');
  const today = new Date();
  const options = { month: 'long', day: 'numeric' };
  dateElement.textContent = today.toLocaleDateString('en-US', options);
});

// === theme ===
const themeBtn = document.getElementById("theme");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("grayscale-mode");
});