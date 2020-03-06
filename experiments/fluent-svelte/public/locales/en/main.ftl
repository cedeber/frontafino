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
