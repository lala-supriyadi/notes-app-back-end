const mapDBToModel = ({
    id,
    title,
    body,
    tags,
    created_at,
    updated_at
}) => ({
    id,
    title,
    tags,
    body,
    createdAt: created_at,
    updatedAt: updated_at,
});

module.exports = { mapDBToModel };