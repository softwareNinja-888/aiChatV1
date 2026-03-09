import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";

(function () {
  const script = document.currentScript;

  const botName = script?.dataset.bot || "Assistant From Embed";
  const color = script?.dataset.color || "#2563eb";
  const welcome =
    script?.dataset.welcome || "Hello! How can I help you today?";

  // Create the host element that will hold the shadow root
  const host = document.createElement("div");
  host.id = "ai-chatbot-widget-host";
  document.body.appendChild(host);

  // Attach the shadow root
  const shadow = host.attachShadow({ mode: "open" });

  // Create a container inside the shadow root for React to mount into
  const container = document.createElement("div");
  container.id = "ai-chatbot-widget-container";
  shadow.appendChild(container);

  // Function to copy styles from head to shadow root
  const injectStyles = () => {
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    styles.forEach((style) => {
      shadow.appendChild(style.cloneNode(true));
    });
  };

  // Initial style injection
  injectStyles();

  // Watch for new styles being added (e.g. by Vite in dev mode or by the injection plugin)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "STYLE" || (node.nodeName === "LINK" && (node as HTMLLinkElement).rel === "stylesheet")) {
          shadow.appendChild(node.cloneNode(true));
        }
      });
    });
  });

  observer.observe(document.head, { childList: true });

  const root = ReactDOM.createRoot(container);

  root.render(
    <ChatWidget
      botName={botName}
      brandColor={color}
      welcomeMessage={welcome}
    />
  );
})();