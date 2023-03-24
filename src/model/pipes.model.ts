function createPipe(){
    const gap = 250;
    const range = 300;
    const position = Math.floor(Math.random() * range) + gap / 2;
    const topPosition = position - gap / 2;
    const bottomPosition = position + gap / 2;
    const velocity = -200;

    return {
        topPosition,
        bottomPosition,
        velocity
    }
}

export default createPipe;


