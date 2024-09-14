//! Get cookies lists using basic JS method

export function GetCookiesList() {
    //* Get all cookies
    const cookies = document.cookie;

    //* Split cookies string into an array
    const cookieArray = cookies.split(';');

    //* Create an object to store cookies
    const cookieObject: { [key: string]: string } = {}; //* Add type annotation here

    //* Loop through the cookie array
    cookieArray.forEach(cookie => {
        //* Split cookie into key-value pair
        const [name, value] = cookie.split('=').map(cookiePart => cookiePart.trim());

        //* Add cookie to object
        cookieObject[name] = value;
    });

    return cookieObject;
}