function ok(res, data) { res.json(data); }
function err(res, status, message) { res.status(status).json({ error: message }); }
module.exports = { ok, err };
