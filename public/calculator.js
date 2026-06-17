// DontMailMe impact calculator.
// Defensive: only runs where the elements exist (homepage), no-ops elsewhere.

// Assumptions (kept transparent on /impact):
//   ~2 emails/week per newsletter  -> 104 emails/year avoided per unsubscribe
//   ~4 g CO2e per promotional email (Carbon Literacy Project, "standard email")
//   ~0.16 kg CO2e per km driven (average passenger car)
//   half of each donation funds tree-planting via One Tree Planted (~€2.50/tree),
//   so roughly €5 donated = 1 tree; ~20 kg CO2 absorbed per tree/year
const EMAILS_PER_NEWSLETTER_YEAR = 104;
const KG_CO2_PER_EMAIL = 0.004;
const KG_CO2_PER_CAR_KM = 0.16;
const EUR_PER_TREE = 5;
const KG_CO2_PER_TREE_YEAR = 20;

const unsubSlider = document.getElementById('unsub-slider');
const priceSlider = document.getElementById('price-slider');

function updateUnsub() {
    const n = parseInt(unsubSlider.value, 10);
    const emails = n * EMAILS_PER_NEWSLETTER_YEAR;
    const co2 = emails * KG_CO2_PER_EMAIL;

    document.getElementById('unsub-val').textContent = n;
    document.getElementById('out-emails').textContent = emails.toLocaleString('en-US');
    document.getElementById('out-co2').textContent = co2.toFixed(1);
    document.getElementById('out-car').textContent = Math.round(co2 / KG_CO2_PER_CAR_KM);
}

function updatePrice() {
    const eur = parseInt(priceSlider.value, 10);
    const trees = Math.floor(eur / EUR_PER_TREE);

    document.getElementById('price-val').textContent = eur;
    document.getElementById('tree-count').textContent = trees;
    document.getElementById('tree-label').textContent = trees === 1 ? 'tree' : 'trees';
    document.getElementById('tree-co2').textContent = trees * KG_CO2_PER_TREE_YEAR;
}

if (unsubSlider) {
    unsubSlider.addEventListener('input', updateUnsub);
    updateUnsub();
}
if (priceSlider) {
    priceSlider.addEventListener('input', updatePrice);
    updatePrice();
}
