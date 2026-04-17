const slider = document.getElementById('price-slider');
const priceVal = document.getElementById('price-val');
const treeCount = document.getElementById('tree-count');
const treeLabel = document.getElementById('tree-label');

const co2Saved = document.getElementById('out-co2');
const carKm = document.getElementById('out-car');
const ledDays = document.getElementById('out-led');

function updateCalculator() {
    const val = parseInt(slider.value);
    const trees = Math.floor(val / 2.5);
    
    priceVal.textContent = val;
    treeCount.textContent = trees;
    treeLabel.textContent = trees === 1 ? 'tree' : 'trees';

    const co2 = val * 0.5;
    co2Saved.textContent = co2.toFixed(1);
    carKm.textContent = (co2 * 5).toFixed(1);
    ledDays.textContent = Math.floor(co2 * 20);
}

slider.addEventListener('input', updateCalculator);
updateCalculator();