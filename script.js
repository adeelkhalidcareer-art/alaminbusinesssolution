document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      const button = form.querySelector('button');
      const originalText = button.textContent;

      button.textContent = 'Sending...';
      button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: {
            Accept: 'application/json'
          }
        });

        if (response.ok) {
          button.textContent = 'Inquiry Sent';
          form.reset();
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        button.textContent = 'Try Again';
        console.error(error);
      } finally {
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2500);
      }
    });
  }
});
