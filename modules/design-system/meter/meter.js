export const createCountDownMeter = (meterElement) => {
    let intervalId;

    const start = (onCountdownFinish) => {
        meterElement.value = 100;

        intervalId = setInterval(() => {
            meterElement.value -= 1;

            if (meterElement.value === 0) {
                clearInterval(intervalId);
                onCountdownFinish();
            }
        }, 100);
    }


    const stop = () => clearInterval(intervalId);

    return {start, stop}
}
