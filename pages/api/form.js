export default function handler(req, res) {
    const body = req.body;

    if (!body.name || !body.email) {
        return res.status(400).json({ data: 'name or e-mail not found' });
    }

    res.status(200).json({ data: `${body.name} ${body.email}` });
}
