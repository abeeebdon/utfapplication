import $ from 'jquery';


export default class api {
    setHeaders(headers) {
        $.ajaxSetup({
            headers
        });
    }

    get(url, doneCallback, failCallback, alwaysCallback){
        return $.get(url, (response) => {
                console.log(response)
                doneCallback(response);
            }
        )
//        .done(
//            (response) => {
//                doneCallback(response);
//                console.log(response)
//            }
//        )
        .fail(
            (response) => {
                console.log(response)
                let errorMessage = response.responseJSON ? ( response.responseJSON.message instanceof Array ? response.responseJSON.message[0].msg : response.responseJSON.message ) : response.statusText;
//                failCallback(errorMessage);
//                <Redirect to="/Error" />
            }
        )
//        .always(
//            (response) => {
//                alwaysCallback(response);
////                console.log(response)
//            }
//        );
    }

    post(url, body, doneCallback, failCallback, alwaysCallback){
        this.setHeaders({
//            "Origin": "https://utx-application-production.up.railway.app",
//            "Access-Control-Allow-Origin": "https://utx-application-production.up.railway.app",
//            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        })
        return $.post(url, body, (response) => {
                console.log(response)
                if(doneCallback)
                    doneCallback(response);
            }
        )
//        .done(
//            (response) => {
//                doneCallback(response);
//                console.log(response)
//            }
//        )
        .fail(
            (response) => {
                console.log(response)
//                let errorMessage = response.responseJSON ? ( response.responseJSON.message instanceof Array ? response.responseJSON.message[0].msg : response.responseJSON.message ) : response.statusText;
                let errorMessage = response.responseJSON ? ( response.responseJSON.message ? response.responseJSON.message : response.responseText ) : response.statusText;
                if(failCallback)
                    failCallback(errorMessage);
//                <Redirect to="/Error" />
            }
        )
//        .always(
//            (response) => {
//                alwaysCallback(response);
////                console.log(response)
//            }
//        );
    }

    postWithFile(url, body, doneCallback, failCallback, alwaysCallback){
        $.ajax({
                type: "POST",
                url,
                data: body,
                dataType: "JSON",
                processData: false,
//                contentType: "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    contentType: false
            })
        .done(
            (response) => {
                console.log(response)
                if(doneCallback)
                    doneCallback(response);
            }
        )
        .fail(
            (response) => {
                console.log(response)
//                let errorMessage = response.responseJSON ? ( response.responseJSON.message instanceof Array ? response.responseJSON.message[0].msg : response.responseJSON.message ) : response.statusText;
                let errorMessage = response.responseJSON ? ( response.responseJSON.message ? response.responseJSON.message : response.responseText ) : response.statusText;
                if(failCallback)
                    failCallback(errorMessage);
//                <Redirect to="/Error" />
            }
        )
//        .always(
//            (response) => {
//                alwaysCallback(response);
////                console.log(response)
//            }
//        );
    }

    patch(url, body, doneCallback, failCallback, alwaysCallback){
        return $.patch(url, body, (response) => {
                doneCallback(response);
                console.log(response)
            }
        )
//        .done(
//            (response) => {
//                doneCallback(response);
//                console.log(response)
//            }
//        )
        .fail(
            (response) => {
                let errorMessage = response.responseJSON ? response.responseJSON.message : response.statusText;
                failCallback(errorMessage);
//                console.log(response)
//                <Redirect to="/Error" />
            }
        )
//        .always(
//            (response) => {
//                alwaysCallback(response);
////                console.log(response)
//            }
//        );
    }
}