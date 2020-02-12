const JeffBuysCake = (typeCake => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            typeCake === 'black forest' ? resolve('black forest cake!') : reject('No cake!');
        }, 1000);
    });
})

const promise = JeffBuysCake('black forest');
console.log(promise)