/**
 * Affiche un message au centre de l'écran avec un style minimaliste et moderne
 * Style inspiré de benone.ch
 * 
 * @param {string} message - Le texte à afficher
 * @param {Object} options - Options de configuration
 * @param {number} options.duration - Durée d'affichage en ms (0 = permanent, par défaut 3000)
 * @param {string} options.type - Type de message: 'info', 'success', 'error', 'warning' (par défaut 'info')
 * @param {Function} options.onClose - Callback appelé à la fermeture
 */
function showMessage(message, options = {}) {
  const {
    duration = 3000,
    type = 'info',
    onClose = null
  } = options;

  // Vérifier si un overlay existe déjà
  let overlay = document.getElementById('benone-message-overlay');
  
  if (!overlay) {
    // Créer l'overlay
    overlay = document.createElement('div');
    overlay.id = 'benone-message-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(8px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(overlay);
  }

  // Créer le conteneur du message
  const messageBox = document.createElement('div');
  messageBox.className = 'benone-message-box';
  
  // Définir les couleurs selon le type
  const colors = {
    info: '#3b82f6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b'
  };
  
  const borderColor = colors[type] || colors.info;
  
  messageBox.style.cssText = `
    background: #0a0a0a;
    border: 2px solid ${borderColor};
    border-radius: 8px;
    padding: 2rem 3rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    transform: scale(0.9) translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;

  // Créer le texte du message
  const messageText = document.createElement('p');
  messageText.style.cssText = `
    color: #ffffff;
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0;
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;
  messageText.textContent = message;

  messageBox.appendChild(messageText);
  overlay.appendChild(messageBox);

  // Animation d'entrée
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
    requestAnimationFrame(() => {
      messageBox.style.transform = 'scale(1) translateY(0)';
      messageBox.style.opacity = '1';
    });
  });

  // Fonction de fermeture
  const closeMessage = () => {
    messageBox.style.transform = 'scale(0.9) translateY(20px)';
    messageBox.style.opacity = '0';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  // Fermeture au clic sur l'overlay
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeMessage();
    }
  });

  // Fermeture automatique si duration > 0
  if (duration > 0) {
    setTimeout(closeMessage, duration);
  }

  // Retourner la fonction de fermeture pour permettre une fermeture manuelle
  return closeMessage;
}

// Export pour utilisation en module ES6
if (typeof module !== 'undefined' && module.exports) {
  module.exports = showMessage;
}

// Export pour utilisation globale
if (typeof window !== 'undefined') {
  window.showMessage = showMessage;
}