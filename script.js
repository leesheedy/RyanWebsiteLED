const quoteForm = document.getElementById('quoteForm');
const quoteResult = document.getElementById('quoteResult');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

const baseByType = {
  driveway: 145,
  decking: 135,
  commercial: 185,
};

const complexityMultiplier = {
  standard: 1,
  custom: 1.2,
  premium: 1.38,
};

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const projectType = document.getElementById('projectType').value;
  const length = Number(document.getElementById('length').value || 0);
  const temperature = document.getElementById('temperature').value;
  const complexity = document.getElementById('complexity').value;

  if (!length || length < 1) {
    quoteResult.textContent = 'Please enter a valid project length in metres.';
    return;
  }

  const base = baseByType[projectType] * length;
  const adjusted = Math.round(base * complexityMultiplier[complexity]);
  const estimateLow = Math.round(adjusted * 0.92);
  const estimateHigh = Math.round(adjusted * 1.1);

  quoteResult.innerHTML = `
    <strong>Estimated Investment: $${estimateLow.toLocaleString()} – $${estimateHigh.toLocaleString()} AUD</strong><br>
    Selected: ${length}m, ${temperature}K, ${projectType}, ${complexity} install.<br>
    <small>Includes premium materials and standard installation labour. Final quote confirmed after site assessment.</small>
  `;
});
