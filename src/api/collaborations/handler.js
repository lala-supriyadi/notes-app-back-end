const ClientError = require('../../exceptions/ClientError');

class CollaborationsHandler {
    constructor(collaborationsService, notesService, validator) {
        this._collaborationsService = collaborationsService;
        this._notesService = notesService;
        this._validator = validator;

        this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this);
        this.deleteCollaborationsHandler = this.deleteCollaborationsHandler.bind(this);
    }

    async postCollaborationsHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);
            const { id: credentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;
            
            await this._notesService.verifyNoteOwner(noteId, credentialId);
            const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

            const response = h.response({
                status: 'success',
                message: 'Kolabrasi berhasil ditambahkan',
                data: {
                    collaborationId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
              }   
        
              // Server ERROR!
              const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
              });
              response.code(500);
              console.log(error);
              return response; 
        }
    }

    async deleteCollaborationsHandler(request, h) {
        try {
            this._validator.validateCollaborationPayload(request.payload);
            const { id: credentialId } = request.auth.credentials;
            const { noteId, userId } = request.payload;
            
            await this._notesService.verifyNoteOwner(noteId, credentialId);
            await this._collaborationsService.deleteCollaboration(noteId, userId);

            return {
                status: 'success',
                message: 'Kolaborasi berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
              }   
        
              // Server ERROR!
              const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
              });
              response.code(500);
              console.log(error);
              return response; 
        }
    }
}

module.exports = CollaborationsHandler;