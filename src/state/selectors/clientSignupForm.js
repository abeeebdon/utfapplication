export const selectVerificationTokenEndpoint = (endpoints, {email}) => {
        return `${enpoints.server.protocol}/${enpoints.server.host}/api${enpoints.apiVersion}/users/${email}/verification`;
}