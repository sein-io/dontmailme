(function() {
    'use strict';

    const unsubSlider = document.getElementById('unsub-slider');
    const priceSlider = document.getElementById('price-slider');
    if (!unsubSlider || !priceSlider) return;

    const unsubVal = document.getElementById('unsub-val');
    const priceVal = document.getElementById('price-val');
    const outCo2 = document.getElementById('out-co2');
    const outCar = document.getElementById('out-car');
    const outLed = document.getElementById('out-led');
    const treeCount = document.getElementById('tree-count');
    const treeLabel = document.getElementById('tree-label');

    function updateCalculator() {
        const unsubs = parseInt(unsubSlider.value, 10);
        unsubVal.textContent = unsubs;

        const co2Kg = unsubs * 1.0; 
        const carKm = co2Kg * 5.95; 
        const ledDays = co2Kg * 5.7; 

        outCo2.textContent = Math.round(co2Kg);
        outCar.textContent = Math.round(carKm);
        outLed.textContent = Math.round(ledDays);

        const price = parseInt(priceSlider.value, 10);
        priceVal.textContent = price;

        const trees = Math.max(0, Math.floor((price * 0.5) / 1));
        const treeText = trees === 1 ? 'tree' : 'trees';
        
        treeCount.textContent = trees;
        treeLabel.textContent = treeText;
    }

    unsubSlider.addEventListener('input', updateCalculator);
    priceSlider.addEventListener('input', updateCalculator);
    updateCalculator();
})();