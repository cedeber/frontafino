import {FluentBundle, FluentResource} from "@fluent/bundle";

let proxy = getProxy(`
-brand-name = Foo 3000
welcome = Welcome, {$name}, to {-brand-name}!

shared-photos =
    {$userName} {$photoCount ->
        [one] added a new photo
       *[other] added {$photoCount} new photos
    } to {$userGender ->
        [male] his stream
        [female] her stream
       *[other] their stream
    }.
`, "en-US");

let {welcome, sharedPhotos} = proxy;

console.log(welcome({name: "Anna"}));
console.log(sharedPhotos({
    "userName": "Anne",
    "userGender": "female",
    "photoCount": 3
}));

function getLocalization(resource, language) {
    let bundle = new FluentBundle(language);

    bundle.addResource(new FluentResource(resource));

    return new Proxy(
        {},
        {
            get(_obj, prop) {
                let key = prop.toString().replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
                let { value } = bundle.getMessage(key);

                return function(params) {
                    return bundle.formatPattern(value, params);
                }
            },
        },
    );
}
