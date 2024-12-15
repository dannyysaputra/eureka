if (!self.define) {
    let s,
        e = {};
    const l = (l, i) => (
        (l = new URL(l + ".js", i).href),
        e[l] ||
            new Promise((e) => {
                if ("document" in self) {
                    const s = document.createElement("script");
                    (s.src = l), (s.onload = e), document.head.appendChild(s);
                } else (s = l), importScripts(l), e();
            }).then(() => {
                let s = e[l];
                if (!s)
                    throw new Error(`Module ${l} didn’t register its module`);
                return s;
            })
    );
    self.define = (i, r) => {
        const n =
            s ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (e[n]) return;
        let u = {};
        const o = (s) => l(s, n),
            t = { module: { uri: n }, exports: u, require: o };
        e[n] = Promise.all(i.map((s) => t[s] || o(s))).then(
            (s) => (r(...s), u)
        );
    };
}
define(["./workbox-5ffe50d4"], function (s) {
    "use strict";
    self.skipWaiting(),
        s.clientsClaim(),
        s.precacheAndRoute(
            [
                { url: "build/assets/app-CMQ87xa2.css", revision: null },
                { url: "build/assets/app-DAcKz3Z8.js", revision: null },
                { url: "build/assets/ArrowButton-CFw0unPb.js", revision: null },
                { url: "build/assets/AskQuestion-BZIr5VQr.js", revision: null },
                {
                    url: "build/assets/AuthenticatedLayout-TELefD48.js",
                    revision: null,
                },
                { url: "build/assets/Collection-BHBazS4z.js", revision: null },
                { url: "build/assets/ConfirmPassword-SUFvA6Cg.js", revision: null },
                { url: "build/assets/Dashboard-Ba8qSZ7k.js", revision: null },
                { url: "build/assets/DeleteUserForm-Bci0F70I.js", revision: null },
                { url: "build/assets/DetailQuestion-DhXtQoDF.js", revision: null },
                {
                    url: "build/assets/DetailQuestionLayout-KSDoKj5y.js",
                    revision: null,
                },
                { url: "build/assets/Dropdown-vhxRSVJt.js", revision: null },
                { url: "build/assets/Edit-C_LiE9HP.js", revision: null },
                { url: "build/assets/EditProfile-MLHx1esO.js", revision: null },
                { url: "build/assets/EurekaLogo-G5aeJM6y.js", revision: null },
                { url: "build/assets/fa-brands-400-Ch568Ea9.woff2", revision: null },
                { url: "build/assets/fa-regular-400-9VThgXHM.woff2", revision: null },
                { url: "build/assets/fa-solid-900-QWY35r5r.woff2", revision: null },
                {
                    url: "build/assets/fa-v4compatibility-BRdYr4HJ.woff2",
                    revision: null,
                },
                { url: "build/assets/ForgotPassword-FUVGB79h.js", revision: null },
                { url: "build/assets/format-cwXK75ha.js", revision: null },
                { url: "build/assets/GoogleLogo-DNKYyFji.js", revision: null },
                { url: "build/assets/GuestLayout-Cxtme4vA.js", revision: null },
                { url: "build/assets/index-BbG6Zifl.js", revision: null },
                { url: "build/assets/InputError-DPfwPNjN.js", revision: null },
                { url: "build/assets/InputLabel-BY3uvMba.js", revision: null },
                { url: "build/assets/JawabanCard-CoJVdVEQ.css", revision: null },
                { url: "build/assets/JawabanCard-DvfAgKqR.js", revision: null },
                { url: "build/assets/Leaderboard-DHUVny0m.js", revision: null },
                { url: "build/assets/Login-BuKtjAFe.js", revision: null },
                { url: "build/assets/MainLayout-1G1yIHgK.js", revision: null },
                { url: "build/assets/MyQuestion-CtxP7HVV.js", revision: null },
                { url: "build/assets/PrimaryButton-DISnIj7B.js", revision: null },
                { url: "build/assets/Profile-DmU3yBsZ.js", revision: null },
                { url: "build/assets/Question-Dxn7ju7Y.js", revision: null },
                { url: "build/assets/QuestionLayout-CfxZjToj.js", revision: null },
                { url: "build/assets/quill-DIxs8W_A.css", revision: null },
                { url: "build/assets/quill.snow-u0VtmR_n.js", revision: null },
                { url: "build/assets/Register-DvQMAKcM.js", revision: null },
                { url: "build/assets/ResetPassword-Ck0lLdIg.js", revision: null },
                { url: "build/assets/RichTextEditor-CDHDfzjX.js", revision: null },
                { url: "build/assets/transition-VOwwYQ_D.js", revision: null },
                {
                    url: "build/assets/UpdatePasswordForm-CGkKwYzp.js",
                    revision: null,
                },
                {
                    url: "build/assets/UpdateProfileInformationForm-BU7gin9N.js",
                    revision: null,
                },
                { url: "build/assets/UpdateQuestion-BE3wE53j.js", revision: null },
                { url: "build/assets/VerifyEmail-BG2Wn7p_.js", revision: null },
                { url: "build/assets/Welcome-BwmsZp1M.js", revision: null },
                {
                    url: "build/manifest.json",
                    revision: "fab3c2ffc3126592997a0cba410baf5b",
                },
                {
                    url: "build/registerSW.js",
                    revision: "1872c500de691dce40960bb85481de07",
                },
                {
                    url: "build/manifest.webmanifest",
                    revision: "7b57430e2466a5e60bd933a04145d700",
                },
            ],
            {}
        ),
        s.cleanupOutdatedCaches(),
        s.registerRoute(
            new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))
        );
});
