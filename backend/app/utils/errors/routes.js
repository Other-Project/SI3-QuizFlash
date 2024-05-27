function manageAllErrors(res, err) {
    let resBuilder = res.status(err.code ?? 500);
    if (err.extra) resBuilder.json(err.extra);
    else resBuilder.end();
}

function catchErrors(req, res, fct) {
    try {
        fct();
    } catch (err) {
        manageAllErrors(res, err);
        console.error(err);
    }
}

module.exports = { catchErrors };