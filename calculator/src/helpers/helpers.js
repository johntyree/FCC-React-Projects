export const calculate = (expression) => {
    const raw = eval(expression.join(" "));
    const pretty = Math.round(raw * 1e10) / 1e10;
    console.log(expression + " = " + pretty);
    return pretty;
}
