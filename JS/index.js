function memoize(func) {
    const cache = new Map();

    return function (city, weight) {
        const key = JSON.stringify([city, weight]);

        if (cache.has(key)) {
            console.log('Из кэша', key);
            return cache.get(key);
        }

        console.log('Расчет:', key);
        const result = func(city, weight);
        cache.set(key, result);
        return result;
    };
};

const calculationDelivery = (city, weight) => {
    let result = 200;
    
    if (city === 'Москва') {
        result += 200;
    } else if (city === 'Санкт-Петербург') {
        result += 100;
    }

    const multiplier = Math.ceil(Number(weight));

    result = multiplier * 20 + result;

    return result;
};

const memoizedCalculationDelivery = memoize(calculationDelivery);

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
});

document.getElementById('button').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const weight = document.getElementById('weight').value;

    if (!city || !weight) {
        return;
    }

    const cost = memoizedCalculationDelivery(city, weight);
    document.getElementById('delivery-cost').value = cost.toFixed(2);
});