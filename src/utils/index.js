const mapDBToModel = ({
    id,
    title,
    body,
    tags,
    created_at,
    updated_at,
    username,
}) => ({
    id,
    title,
    tags,
    body,
    createdAt: created_at,
    updatedAt: updated_at,
    username,
});

module.exports = { mapDBToModel };