

export interface IRequestService{
    createRequest(request);

    setRequestStatus(request, status);

    getRequestForEmail(email);
}