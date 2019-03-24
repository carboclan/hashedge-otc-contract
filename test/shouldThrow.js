module.exports = async promise => {
  try {
    await promise;
    throw null;
  } catch (e) {
    assert(e, 'promise should be rejected.');
  }
};
