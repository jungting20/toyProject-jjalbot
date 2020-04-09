const identity = a => a;
const isnotnull = a => a !== null;
const iscompact = (...args) => args.every(identity);
const Not = fn => (...args) => !fn(...args);
const isnotcompact = Not(iscompact);

module.exports = { isnotnull, iscompact, identity, isnotcompact };
