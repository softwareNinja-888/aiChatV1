import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";

(function () {
  const script = document.currentScript;

  const botName = script?.dataset.bot || "Assistant From Embed";
  const color = script?.dataset.color || "#2563eb";
  const welcome =
    script?.dataset.welcome || "Hello! How can I help you today?";

  const container = document.createElement("div");
  container.id = "ai-chatbot-widget";

  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  root.render(
    <ChatWidget
      botName={botName}
      brandColor={color}
      welcomeMessage={welcome}
    />
  );
})();