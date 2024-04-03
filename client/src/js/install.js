const butInstall = document.getElementById('buttonInstall');

// Event listener for beforeinstallprompt
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the event in a global variable
  window.deferredPrompt = event;
  // Show the install button
  butInstall.classList.remove('hidden');
});

// Event listener for install button click
butInstall.addEventListener('click', async () => {
  // Retrieve the prompt event
  const promptEvent = window.deferredPrompt;
  // Show the installation prompt
  promptEvent.prompt();
  // Reset the deferred prompt variable
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.classList.add('hidden');
});

// Event listener for appinstalled event
window.addEventListener('appinstalled', () => {
  // Reset the deferred prompt variable
  window.deferredPrompt = null;
});