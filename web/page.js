(() => {
const IC = {"basket": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\"></path><path d=\"M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M17 10l-2 -6\"></path><path d=\"M7 10l2 -6\"></path></svg>", "overview": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path><path d=\"M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path></svg>", "camera": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2\"></path><path d=\"M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\"></path></svg>", "upload": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 8h.01\"></path><path d=\"M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5\"></path><path d=\"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4\"></path><path d=\"M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54\"></path><path d=\"M16 19h6\"></path><path d=\"M19 16v6\"></path></svg>", "analytics": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-3.8a4.1 4.1 0 1 1 -5 -5v-4a.9 .9 0 0 0 -1 -.8\"></path><path d=\"M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a9 9 0 0 0 -1 -1v-4.5\"></path></svg>", "reports": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 3v4a1 1 0 0 0 1 1h4\"></path><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\"></path><path d=\"M9 9l1 0\"></path><path d=\"M9 13l6 0\"></path><path d=\"M9 17l6 0\"></path></svg>", "pantry": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -14\"></path><path d=\"M5 10h14\"></path><path d=\"M9 13v3\"></path><path d=\"M9 6v1\"></path></svg>", "options": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 6l8 0\"></path><path d=\"M16 6l4 0\"></path><path d=\"M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 12l2 0\"></path><path d=\"M10 12l10 0\"></path><path d=\"M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 18l11 0\"></path><path d=\"M19 18l1 0\"></path></svg>", "qr": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M7 17l0 .01\"></path><path d=\"M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M7 7l0 .01\"></path><path d=\"M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M17 7l0 .01\"></path><path d=\"M14 14l3 0\"></path><path d=\"M20 14l0 .01\"></path><path d=\"M14 14l0 3\"></path><path d=\"M14 20l3 0\"></path><path d=\"M17 17l3 0\"></path><path d=\"M20 17l0 3\"></path></svg>", "menu": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 6l16 0\"></path><path d=\"M4 12l16 0\"></path><path d=\"M4 18l16 0\"></path></svg>", "close": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 6l-12 12\"></path><path d=\"M6 6l12 12\"></path></svg>", "cart": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M17 17h-11v-14h-2\"></path><path d=\"M6 5l14 1l-1 7h-13\"></path></svg>", "receipt": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2\"></path></svg>", "apple": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 11.319c0 3.102 .444 5.319 2.222 7.978c1.351 1.797 3.156 2.247 5.08 .988c.426 -.268 .97 -.268 1.397 0c1.923 1.26 3.728 .809 5.079 -.988c1.778 -2.66 2.222 -4.876 2.222 -7.977c0 -2.661 -1.99 -5.32 -4.444 -5.32c-1.267 0 -2.41 .693 -3.22 1.44a.5 .5 0 0 1 -.672 0c-.809 -.746 -1.953 -1.44 -3.22 -1.44c-2.454 0 -4.444 2.66 -4.444 5.319\"></path><path d=\"M7 12c0 -1.47 .454 -2.34 1.5 -3\"></path><path d=\"M12 7c0 -1.2 .867 -4 3 -4\"></path></svg>", "up": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 17l6 -6l4 4l8 -8\"></path><path d=\"M14 7l7 0l0 7\"></path></svg>", "down": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 7l6 6l4 -4l8 8\"></path><path d=\"M21 10l0 7l-7 0\"></path></svg>", "milk": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 6h8v-2a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v2\"></path><path d=\"M16 6l1.094 1.759a6 6 0 0 1 .906 3.17v8.071a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8.071a6 6 0 0 1 .906 -3.17l1.094 -1.759\"></path><path d=\"M10 16a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M10 10h4\"></path></svg>", "bag": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M9 11v-5a3 3 0 0 1 6 0v5\"></path></svg>", "calendar": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\"></path><path d=\"M16 3v4\"></path><path d=\"M8 3v4\"></path><path d=\"M4 11h16\"></path><path d=\"M11 15h1\"></path><path d=\"M12 15v3\"></path></svg>", "search": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\"></path><path d=\"M21 21l-6 -6\"></path></svg>", "trash": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 7l16 0\"></path><path d=\"M10 11l0 6\"></path><path d=\"M14 11l0 6\"></path><path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\"></path><path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\"></path></svg>", "download": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path><path d=\"M7 11l5 5l5 -5\"></path><path d=\"M12 4l0 12\"></path></svg>", "cloud": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1\"></path><path d=\"M9 15l3 -3l3 3\"></path><path d=\"M12 12l0 9\"></path></svg>", "check": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 12l5 5l10 -10\"></path></svg>", "warn": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 9v4\"></path><path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\"></path><path d=\"M12 16h.01\"></path></svg>", "egg": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083\"></path></svg>", "carrot": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 21s9.834 -3.489 12.684 -6.34a4.487 4.487 0 0 0 0 -6.344a4.483 4.483 0 0 0 -6.342 0c-2.86 2.861 -6.347 12.689 -6.347 12.689l.005 -.005\"></path><path d=\"M9 13l-1.5 -1.5\"></path><path d=\"M16 14l-2 -2\"></path><path d=\"M22 8s-1.14 -2 -3 -2c-1.406 0 -3 2 -3 2s1.14 2 3 2s3 -2 3 -2\"></path><path d=\"M16 2s-2 1.14 -2 3s2 3 2 3s2 -1.577 2 -3c0 -1.86 -2 -3 -2 -3\"></path></svg>", "meat": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.62 8.382l1.966 -1.967a2 2 0 1 1 3.414 -1.415a2 2 0 1 1 -1.413 3.414l-1.82 1.821\"></path><path d=\"M5.904 18.596c2.733 2.734 5.9 4 7.07 2.829c1.172 -1.172 -.094 -4.338 -2.828 -7.071c-2.733 -2.734 -5.9 -4 -7.07 -2.829c-1.172 1.172 .094 4.338 2.828 7.071\"></path><path d=\"M7.5 16l1 1\"></path><path d=\"M12.975 21.425c3.905 -3.906 4.855 -9.288 2.121 -12.021c-2.733 -2.734 -8.115 -1.784 -12.02 2.121\"></path></svg>", "bread": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 4a3 3 0 0 1 2 5.235v8.765a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-8.764a3 3 0 0 1 1.824 -5.231h12.176v-.005\"></path></svg>", "bottle": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 5h4v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v2\"></path><path d=\"M14 3.5c0 1.626 .507 3.212 1.45 4.537l.05 .07a8.093 8.093 0 0 1 1.5 4.694v6.199a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-6.2c0 -1.682 .524 -3.322 1.5 -4.693l.05 -.07a7.823 7.823 0 0 0 1.45 -4.537\"></path><path d=\"M7 14.803a2.4 2.4 0 0 0 1 -.803a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 1 -.805\"></path></svg>", "candy": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.05 11.293l4.243 -4.243a2 2 0 0 1 2.828 0l2.829 2.83a2 2 0 0 1 0 2.828l-4.243 4.243a2 2 0 0 1 -2.828 0l-2.829 -2.831a2 2 0 0 1 0 -2.828\"></path><path d=\"M16.243 9.172l3.086 -.772a1.5 1.5 0 0 0 .697 -2.516l-2.216 -2.217a1.5 1.5 0 0 0 -2.44 .47l-1.248 2.913\"></path><path d=\"M9.172 16.243l-.772 3.086a1.5 1.5 0 0 1 -2.516 .697l-2.217 -2.216a1.5 1.5 0 0 1 .47 -2.44l2.913 -1.248\"></path></svg>", "snow": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 4l2 1l2 -1\"></path><path d=\"M12 2v6.5l3 1.72\"></path><path d=\"M17.928 6.268l.134 2.232l1.866 1.232\"></path><path d=\"M20.66 7l-5.629 3.25l.01 3.458\"></path><path d=\"M19.928 14.268l-1.866 1.232l-.134 2.232\"></path><path d=\"M20.66 17l-5.629 -3.25l-2.99 1.738\"></path><path d=\"M14 20l-2 -1l-2 1\"></path><path d=\"M12 22v-6.5l-3 -1.72\"></path><path d=\"M6.072 17.732l-.134 -2.232l-1.866 -1.232\"></path><path d=\"M3.34 17l5.629 -3.25l-.01 -3.458\"></path><path d=\"M4.072 9.732l1.866 -1.232l.134 -2.232\"></path><path d=\"M3.34 7l5.629 3.25l2.99 -1.738\"></path></svg>", "cup": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 11h14v-3h-14l0 3\"></path><path d=\"M17.5 11l-1.5 10h-8l-1.5 -10\"></path><path d=\"M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1\"></path><path d=\"M15 5v-2\"></path></svg>", "home": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 12l-2 0l9 -9l9 9l-2 0\"></path><path d=\"M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7\"></path><path d=\"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6\"></path></svg>", "bath": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1\"></path><path d=\"M6 12v-7a2 2 0 0 1 2 -2h3v2.25\"></path><path d=\"M4 21l1 -1.5\"></path><path d=\"M20 21l-1 -1.5\"></path></svg>", "tag": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\"></path><path d=\"M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3\"></path></svg>", "tax": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 14l6 -6\"></path><path d=\"M9 8.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0\" fill=\"currentColor\"></path><path d=\"M14 13.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0\" fill=\"currentColor\"></path><path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2\"></path></svg>", "lemon": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.536 3.393c3.905 3.906 3.905 10.237 0 14.143c-3.906 3.905 -10.237 3.905 -14.143 0l14.143 -14.143\"></path><path d=\"M5.868 15.06a6.5 6.5 0 0 0 9.193 -9.192\"></path><path d=\"M10.464 10.464l4.597 4.597\"></path><path d=\"M10.464 10.464v6.364\"></path><path d=\"M10.464 10.464h6.364\"></path></svg>", "salad": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1\"></path><path d=\"M18.5 11c.351 -1.017 .426 -2.236 .5 -3.714v-1.286h-2.256c-2.83 0 -4.616 .804 -5.64 2.076\"></path><path d=\"M5.255 11.008a12.204 12.204 0 0 1 -.255 -2.008v-1h1.755c.98 0 1.801 .124 2.479 .35\"></path><path d=\"M8 8l1 -4l4 2.5\"></path><path d=\"M13 11v-.5a2.5 2.5 0 1 0 -5 0v.5\"></path></svg>", "chev": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 6l6 6l-6 6\"></path></svg>", "plus": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 5l0 14\"></path><path d=\"M5 12l14 0\"></path></svg>", "list": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3.5 5.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M3.5 11.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M3.5 17.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M11 6l9 0\"></path><path d=\"M11 12l9 0\"></path><path d=\"M11 18l9 0\"></path></svg>", "clock": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\"></path><path d=\"M12 7v5l3 3\"></path></svg>", "mushroom": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 11.1c0 -4.474 -3.582 -8.1 -8 -8.1s-8 3.626 -8 8.1a.9 .9 0 0 0 .9 .9h14.2a.9 .9 0 0 0 .9 -.9\"></path><path d=\"M10 12v7a2 2 0 1 0 4 0v-7\"></path></svg>", "pepper": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13 11c0 2.21 -2.239 4 -5 4s-5 -1.79 -5 -4a8 8 0 1 0 16 0a3 3 0 0 0 -6 0\"></path><path d=\"M16 8c0 -2 2 -4 4 -4\"></path></svg>", "fish": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.69 7.44a6.973 6.973 0 0 0 -1.69 4.56c0 1.747 .64 3.345 1.699 4.571\"></path><path d=\"M2 9.504c7.715 8.647 14.75 10.265 20 2.498c-5.25 -7.761 -12.285 -6.142 -20 2.504\"></path><path d=\"M18 11v.01\"></path><path d=\"M11.5 10.5c-.667 1 -.667 2 0 3\"></path></svg>", "cheese": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.519 20.008l16.481 -.008v-3.5a2 2 0 1 1 0 -4v-3.5h-16.722\"></path><path d=\"M21 9l-9.385 -4.992c-2.512 .12 -4.758 1.42 -6.327 3.425c-1.423 1.82 -2.288 4.221 -2.288 6.854c0 2.117 .56 4.085 1.519 5.721\"></path><path d=\"M15 13v.01\"></path><path d=\"M8 13v.01\"></path><path d=\"M11 16v.01\"></path></svg>"};
const CAT = {
  "Produce":["#5E9E4A","carrot"], "Dairy & Eggs":["#5E95CF","milk"], "Meat & Seafood":["#C2453D","meat"],
  "Bakery":["#D29A45","bread"], "Pantry":["#A8794A","bottle"], "Snacks":["#9B5DA8","candy"], "Frozen":["#3FA6BD","snow"],
  "Beverages":["#2E8C8C","cup"], "Household":["#7D8A99","home"], "Personal Care":["#D27FA7","bath"],
  "Other":["#A7AEA9","tag"], "Tax":["#BFC6C1","tax"] };
const cc = c => (CAT[c]||CAT.Other)[0], ci = c => IC[(CAT[c]||CAT.Other)[1]];

let RECEIPTS = [];   // filled from the server by loadData()

const money = v => "$" + v.toLocaleString("en-CA",{minimumFractionDigits:2,maximumFractionDigits:2});
const money0 = v => "$" + Math.round(v).toLocaleString("en-CA");
const d = s => new Date(s + "T12:00:00");
const fmt = (s, o={day:"numeric",month:"short"}) => d(s).toLocaleDateString("en-GB", o);
const monthKey = s => s.slice(0,7);
const monthName = k => d(k + "-15").toLocaleDateString("en-GB",{month:"long",year:"numeric"});
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function lines(){ // flatten to one row per line, tax included as its own line
  const out = [];
  for (const r of RECEIPTS){
    for (const it of r.items) out.push({...it, rid:r.id, date:r.date, store:r.store});
    if (r.tax) out.push({name:"Sales tax", qty:1, unit:"ea", unit_price:r.tax, amount:r.tax, category:"Tax", rid:r.id, date:r.date, store:r.store});
  }
  return out;
}
const total = r => r.subtotal + r.tax;
const sum = (a, f = x => x.amount) => a.reduce((s, x) => s + f(x), 0);
const months = () => [...new Set(RECEIPTS.map(r => monthKey(r.date)))].sort();
function byCat(rows){ const m = {}; rows.forEach(r => m[r.category] = (m[r.category]||0) + r.amount);
  return Object.entries(m).sort((a,b) => b[1]-a[1]); }

// ---------- storage (per-viewer convenience) ----------
const DEFAULT_CAT_BUDGETS = {"Produce":40,"Dairy & Eggs":35,"Meat & Seafood":35,"Pantry":25,"Bakery":15,"Snacks":15};
function load(k, f){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch(e){ return f; } }
function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
let BUDGET = 0, CAT_BUDGETS = {...DEFAULT_CAT_BUDGETS}, STORAGE = "";

// ---------- charts ----------
function barsSVG(items, {h = 190, label = x => x.label, value = x => x.value, color = () => "var(--leaf)"} = {}){
  if (!items.length) return '<div class="empty">No receipts yet.</div>';
  const W = 520, top = 26, bottom = 30, max = Math.max(...items.map(value)) * 1.1 || 1;
  const slot = (W - 44) / items.length, bw = Math.min(46, slot * 0.55), ih = h - top - bottom;
  const ticks = [0, max/2, max].map(t => {
    const y = top + ih - (t/max)*ih;
    return `<line x1="40" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)" ${t ? 'stroke-dasharray="3 4"' : ''}/>` +
           `<text x="34" y="${y+4}" text-anchor="end" fill="var(--muted)" font-size="11">${money0(t)}</text>`;}).join("");
  const bars = items.map((x, i) => {
    const v = value(x), bh = (v/max)*ih, cx = 44 + slot*i + slot/2;
    return `<rect x="${cx-bw/2}" y="${top+ih-bh}" width="${bw}" height="${bh}" rx="7" fill="${color(x, i)}"><title>${esc(label(x))}: ${money(v)}</title></rect>` +
           `<text x="${cx}" y="${top+ih-bh-7}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" class="num">${money(v)}</text>` +
           `<text x="${cx}" y="${h-10}" text-anchor="middle" font-size="12" fill="var(--muted)">${esc(label(x))}</text>`;}).join("");
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="Bar chart">${ticks}${bars}</svg>`;
}
function stackedSVG(monthsData){ // [{label, parts:[[cat, amt]]}]
  if (!monthsData.length) return '<div class="empty">No receipts in this period.</div>';
  const W = 520, h = 220, top = 26, bottom = 30, ih = h - top - bottom;
  const max = Math.max(...monthsData.map(m => sum(m.parts, p => p[1]))) * 1.12;
  const slot = (W - 44) / monthsData.length, bw = Math.min(64, slot * 0.5);
  let out = [0, max/2, max].map(t => { const y = top + ih - (t/max)*ih;
    return `<line x1="40" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)" ${t ? 'stroke-dasharray="3 4"' : ''}/><text x="34" y="${y+4}" text-anchor="end" fill="var(--muted)" font-size="11">${money0(t)}</text>`; }).join("");
  monthsData.forEach((m, i) => {
    const cx = 44 + slot*i + slot/2; let y = top + ih, tot = 0;
    m.parts.forEach(([c, a]) => { const bh = (a/max)*ih; y -= bh; tot += a;
      out += `<rect x="${cx-bw/2}" y="${y}" width="${bw}" height="${Math.max(bh-1.5,0)}" fill="${cc(c)}"><title>${esc(c)}: ${money(a)}</title></rect>`; });
    out += `<text x="${cx}" y="${y-8}" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)" class="num">${money(tot)}</text>` +
           `<text x="${cx}" y="${h-10}" text-anchor="middle" font-size="12" fill="var(--muted)">${esc(m.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="Spending by month">${out}</svg>`;
}
function donutHTML(parts){
  if (!parts.length) return '<div class="empty">No receipts this month.</div>';
  const tot = sum(parts, p => p[1]), C = 2*Math.PI*40; let off = 0;
  const segs = parts.map(([c, a]) => { const len = a/tot*C;
    const s = `<circle cx="50" cy="50" r="40" fill="none" stroke="${cc(c)}" stroke-width="13" stroke-dasharray="${Math.max(len-1.2,0)} ${C}" stroke-dashoffset="${-off}"><title>${esc(c)}: ${money(a)}</title></circle>`;
    off += len; return s; }).join("");
  const svg = `<svg viewBox="0 0 100 100" width="150" height="150" role="img" aria-label="Spending by category"><g transform="rotate(-90 50 50)">${segs}</g>
    <text x="50" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" class="num">${money0(tot)}</text>
    <text x="50" y="62" text-anchor="middle" font-size="8" fill="var(--muted)">total</text></svg>`;
  const leg = parts.slice(0, 6).map(([c, a]) => `<div><span class="dot" style="background:${cc(c)}"></span>${esc(c)}<b class="num">${Math.round(a/tot*100)}%</b></div>`).join("");
  return svg + `<div class="legend">${leg}</div>`;
}
function lineSVG(points){ // [{label, value}]
  const W = 520, h = 170, top = 28, bottom = 28, ih = h - top - bottom;
  const max = Math.max(...points.map(p => p.value)) * 1.25 || 1, step = points.length > 1 ? (W - 80) / (points.length - 1) : 0;
  const xy = points.map((p, i) => [40 + (points.length > 1 ? i*step : (W-80)/2), top + ih - (p.value/max)*ih]);
  const path = xy.map((q, i) => (i ? "L" : "M") + q[0] + " " + q[1]).join(" ");
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="Price history">
    <line x1="30" x2="${W}" y1="${top+ih}" y2="${top+ih}" stroke="var(--line)"/>
    <path d="${path}" fill="none" stroke="var(--leaf)" stroke-width="2.5" stroke-linejoin="round"/>
    ${xy.map((q, i) => `<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="var(--leaf)"/><text x="${q[0]}" y="${q[1]-11}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" class="num">${money(points[i].value)}</text><text x="${q[0]}" y="${h-8}" text-anchor="middle" font-size="12" fill="var(--muted)">${esc(points[i].label)}</text>`).join("")}
  </svg>`;
}
function kpiCard(label, value, icon, color, chip, chipTone = "good", sub = ""){
  return `<div class="panel kpi"><div><div class="lab">${label}</div><div class="val num">${value}</div>
    <span class="chip ${chipTone}">${chip}</span>${sub ? `<span class="sub">${sub}</span>` : ""}</div>
    <div class="ic" style="background:${color}">${IC[icon]}</div></div>`;
}

// ---------- insights ----------
function priceChanges(){
  const by = {};
  lines().filter(l => l.category !== "Tax").forEach(l => (by[l.name] = by[l.name] || []).push(l));
  return Object.entries(by).filter(([, a]) => a.length > 1)
    .map(([n, a]) => { a.sort((x, y) => x.date.localeCompare(y.date));
      const f = a[0].unit_price, l = a[a.length-1].unit_price; return {name:n, first:f, last:l, from:a[0].date, change:f ? l/f - 1 : 0, count:a.length}; });
}
function gapDays(){
  const ds = [...new Set(RECEIPTS.map(r => r.date))].sort(); if (ds.length < 2) return null;
  return Math.round((d(ds[ds.length-1]) - d(ds[0])) / 864e5 / (ds.length - 1));
}
const title = s => s.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase());

// ---------- OVERVIEW ----------
function renderOverview(){
  const ms = months(), sel = document.getElementById("ovMonth");
  const keep = sel.value && ms.includes(sel.value) ? sel.value : ms[ms.length-1];
  sel.innerHTML = ms.map(m => `<option value="${m}">${monthName(m)}</option>`).join("");
  if (!ms.length){
    document.getElementById("ovKpis").innerHTML = '<div class="panel empty" style="grid-column:1/-1">No receipts yet. <a href="#scan" style="color:var(--leaf-text)">Scan your first one</a> to see your overview.</div>';
    ["ovTrips","ovDonut","ovRecent","ovInsights","ovBudgets"].forEach(id => document.getElementById(id).innerHTML = '<div class="empty">Nothing yet.</div>');
    document.getElementById("ovDonutLabel").textContent = ""; return; }
  sel.value = keep;
  const prev = ms[ms.indexOf(keep)-1];
  const rs = RECEIPTS.filter(r => monthKey(r.date) === keep), prs = prev ? RECEIPTS.filter(r => monthKey(r.date) === prev) : [];
  const spent = sum(rs, total), trips = rs.length, avg = trips ? spent/trips : 0, pavg = prs.length ? sum(prs, total)/prs.length : 0;
  const nItems = sum(rs, r => r.items.length);
  const pct = BUDGET ? spent/BUDGET : 0, tone = pct < .8 ? "good" : pct <= 1 ? "warn" : "bad";
  const g = gapDays();
  document.getElementById("ovKpis").innerHTML =
    kpiCard("Spent", money(spent), "cart", "#2F7A3B", BUDGET ? `${Math.round(pct*100)}% of ${money0(BUDGET)}` : "no budget set", tone) +
    kpiCard("Trips", trips, "receipt", "#3E7CC2", g ? `about every ${g} days` : "first trips", "plain") +
    kpiCard("Average basket", money(avg), "basket", "#B7791F",
      pavg ? `${avg >= pavg ? IC.up : IC.down} ${money0(Math.abs(avg - pavg))}` : "first month", pavg && avg > pavg ? "warn" : "good", pavg ? `vs ${monthName(prev).split(" ")[0]}` : "") +
    kpiCard("Items", nItems, "apple", "#7A55B5", trips ? `${Math.round(nItems/trips)} per trip` : "–", "plain");

  const last6 = [...RECEIPTS].sort((a, b) => a.date.localeCompare(b.date)).slice(-6);
  const shades = ["#C3E0B5","#9ECB8A","#78B464","#559A43","#3C8231","#2F6B27"].slice(-last6.length);
  document.getElementById("ovTrips").innerHTML = barsSVG(last6, {label: r => fmt(r.date), value: total, color: (x, i) => shades[i]});
  document.getElementById("ovDonutLabel").textContent = monthName(keep);
  document.getElementById("ovDonut").innerHTML = donutHTML(byCat(lines().filter(l => monthKey(l.date) === keep)));

  const recent = [...RECEIPTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  document.getElementById("ovRecent").innerHTML = `<table><thead><tr><th>Date</th><th>Store</th><th class="right">Items</th><th class="right">Total</th><th>Check</th></tr></thead><tbody>` +
    recent.map(r => { const ok = Math.abs(sum(r.items) - r.subtotal) < .01;
      const chip = !r.printed ? '<span class="chip plain">Saved</span>' : ok ? '<span class="chip good">Matched</span>' : '<span class="chip warn">Check items</span>';
      return `<tr><td>${fmt(r.date)}</td><td>${esc(r.store)}</td><td class="right num">${r.items.length}</td><td class="right num">${money(total(r))}</td><td>${chip}</td></tr>`; }).join("") + `</tbody></table>`;

  const ins = [], up = priceChanges().filter(p => p.change > .005).sort((a, b) => b.change - a.change)[0];
  if (up) ins.push(["#B7791F", "up", `${title(up.name)} up ${Math.round(up.change*100)}%`, `${money(up.first)} → ${money(up.last)} since ${fmt(up.from)}`]);
  const cats = byCat(lines().filter(l => l.category !== "Tax")), all = sum(cats, c => c[1]);
  if (cats.length) ins.push([cc(cats[0][0]), (CAT[cats[0][0]]||CAT.Other)[1], `${cats[0][0]} leads`, `${Math.round(cats[0][1]/all*100)}% of everything you’ve bought`]);
  const bags = sum(lines().filter(l => /REUBL|BAG/i.test(l.name)));
  if (bags) ins.push(["#2F7A3B", "bag", `Bags: ${money(bags)} so far`, "Bring your own to skip the fee"]);
  if (g) ins.push(["#3E7CC2", "calendar", `You shop about every ${g} days`, `${RECEIPTS.length} trips recorded`]);
  document.getElementById("ovInsights").innerHTML = ins.slice(0, 4).map(([c, i, b, s]) =>
    `<div class="ins"><div class="ic" style="background:${c}">${IC[i]}</div><div><b>${esc(b)}</b><span class="muted">${esc(s)}</span></div></div>`).join("");

  const mc = Object.fromEntries(byCat(lines().filter(l => monthKey(l.date) === keep)));
  document.getElementById("ovBudgets").innerHTML = Object.entries(CAT_BUDGETS).map(([c, b]) => {
    const s = mc[c] || 0, p = b ? s/b : 0, col = p <= .8 ? cc(c) : p <= 1 ? "#D29A45" : "#C2453D";
    return `<div><div class="budget-row"><span style="display:flex;align-items:center;gap:6px"><span style="color:${cc(c)};font-size:17px">${ci(c)}</span>${esc(c)}</span><span class="muted num">${money0(s)} of ${money0(b)}</span></div>
      <div class="track"><i style="width:${Math.min(p, 1)*100}%;background:${col}"></i></div></div>`; }).join("");
}

// ---------- SCAN ----------
const mdToHtml = s => esc(s || "").replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/ {2}\n|\n/g, "<br>");
function scanResultHTML(res){
  if (res.kind === "error") return `<div class="status err">${IC.warn}<div>${mdToHtml(res.message)}</div></div>`;
  const tone = res.kind === "failed" ? "err" : res.kind === "duplicate" ? "info" : res.matched === false ? "warn" : "ok";
  const icon = tone === "ok" ? IC.check : tone === "info" ? IC.receipt : IC.warn;
  let html = `<div class="status ${tone}">${icon}<div>${mdToHtml(res.message)}</div></div>`;
  if (res.lines && res.lines.length) html += `<div class="tablewrap"><table><thead><tr><th>Item</th><th class="right">Qty</th><th class="right">Amount</th><th>Category</th></tr></thead><tbody>${
    res.lines.map(i => `<tr><td>${esc(title(String(i.name)))}</td><td class="right num">${i.qty ?? ""}${i.unit === "kg" ? " kg" : ""}</td><td class="right num">${i.amount == null ? "" : money(i.amount)}</td><td><span style="display:inline-flex;align-items:center;gap:6px"><span style="color:${cc(i.category)}">${ci(i.category)}</span>${esc(i.category)}</span></td></tr>`).join("")}</tbody></table></div>`;
  if (res.text) html += `<details class="over"><summary>What the model read</summary><pre style="white-space:pre-wrap;font-size:12px;margin:10px 0 0">${esc(res.text)}</pre></details>`;
  return html;
}
async function call(fn, ...args){
  const r = await server[fn](...args);
  if (r === undefined || r === null) throw new Error("The app didn’t answer. If the Colab cell stopped or the connection dropped, start it again and reload this page.");
  return r;
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function readOne(file, date = "", store = ""){
  const up = await upload(file);
  if (!up || !up.path) throw new Error("The photo didn’t upload. Check your connection and try again.");
  const start = await call("api_scan_start", up.path, date, store);
  const until = Date.now() + 6 * 60 * 1000;          // give up after 6 minutes
  let misses = 0;
  while (Date.now() < until){
    await sleep(2000);
    let s;
    try { s = await call("api_scan_status", start.job); misses = 0; }
    catch (err) { if (++misses >= 5) throw err; continue; }   // ride out short connection blips
    if (s.state === "done") return s.result;
    if (s.state === "missing") throw new Error("The app restarted while reading. Please scan the receipt again.");
  }
  throw new Error("Reading took longer than 6 minutes. Please try again.");
}
document.getElementById("scanFile").addEventListener("change", async e => {
  const f = e.target.files[0]; if (!f) return;
  const img = document.getElementById("scanPreview"); img.src = URL.createObjectURL(f); img.hidden = false;
  const box = document.getElementById("scanResult");
  box.innerHTML = `<div class="status info">${IC.clock}<div><b>Reading your receipt…</b><br>This usually takes 30 to 60 seconds. Keep this page open.</div></div><div class="bar"><i id="scanBar" style="width:4%"></i></div>`;
  let w = 4; const t = setInterval(() => { w = Math.min(w + 1.6, 92); const b = document.getElementById("scanBar"); if (b) b.style.width = w + "%"; }, 900);
  try {
    const res = await readOne(f, document.getElementById("scanDate").value.trim(), document.getElementById("scanStore").value.trim());
    box.innerHTML = scanResultHTML(res);
    if (res.kind === "saved") await loadData();
  } catch (err) {
    box.innerHTML = scanResultHTML({kind: "error", message: (err && err.message) || String(err)});
  } finally { clearInterval(t); e.target.value = ""; }
});
const drop = document.getElementById("scanDrop");
["dragover","dragenter"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave","drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => { const f = e.dataTransfer.files[0]; if (f){ const dt = new DataTransfer(); dt.items.add(f); const inp = document.getElementById("scanFile"); inp.files = dt.files; inp.dispatchEvent(new Event("change")); } });

// ---------- UPLOAD SEVERAL ----------
document.getElementById("bulkFile").addEventListener("change", async e => {
  const files = [...e.target.files]; if (!files.length) return;
  document.getElementById("bulkPanel").hidden = false;
  const rows = files.map(f => ({name: f.name, res: null, state: "Waiting"})), table = document.getElementById("bulkTable");
  const chip = r => r.state === "Saved" ? "good" : r.state === "Saved, check items" ? "warn" : r.state === "Couldn’t read" ? "bad" : "plain";
  const draw = () => { table.innerHTML = `<table><thead><tr><th>Photo</th><th>Store</th><th>Date</th><th class="right">Paid</th><th>Result</th></tr></thead><tbody>${
    rows.map(r => `<tr><td>${esc(r.name)}</td><td>${r.res && r.res.store ? esc(r.res.store) : ""}</td><td>${r.res && r.res.date ? fmt(r.res.date) : ""}</td><td class="right num">${r.res && r.res.paid != null ? money(r.res.paid) : ""}</td><td><span class="chip ${chip(r)}">${r.state}</span></td></tr>`).join("")}</tbody></table>`; };
  draw();
  for (let i = 0; i < rows.length; i++){
    document.getElementById("bulkCount").textContent = `Reading receipt ${i + 1} of ${rows.length}`;
    rows[i].state = "Reading…"; draw();
    try {
      const res = await readOne(files[i]); rows[i].res = res;
      rows[i].state = res.kind === "saved" ? (res.matched === false ? "Saved, check items" : "Saved")
                    : res.kind === "duplicate" ? "Already saved" : "Couldn’t read";
    } catch (err) { rows[i].state = "Couldn’t read"; }
    document.getElementById("bulkBar").style.width = ((i + 1) / rows.length * 100) + "%";
    draw();
  }
  const saved = rows.filter(r => r.state.startsWith("Saved")).length, check = rows.filter(r => r.state === "Saved, check items").length;
  document.getElementById("bulkCount").textContent = `${saved} of ${rows.length} saved` + (check ? `, ${check} to check in Reports` : "");
  e.target.value = ""; await loadData();
});

// ---------- ANALYTICS ----------
function anRows(){
  const p = document.getElementById("anPeriod").value, s = document.getElementById("anStore").value, c = document.getElementById("anCat").value;
  return lines().filter(l => (p === "all" || monthKey(l.date) === p) && (s === "all" || l.store === s) && (c === "all" || l.category === c));
}
function setupFilters(){
  const keep = id => document.getElementById(id).value;
  const p = keep("anPeriod"), s = keep("anStore"), c = keep("anCat");
  document.getElementById("anPeriod").innerHTML = `<option value="all">All time</option>` + months().map(m => `<option value="${m}">${monthName(m)}</option>`).join("");
  document.getElementById("anStore").innerHTML = `<option value="all">All stores</option>` + [...new Set(RECEIPTS.map(r => r.store))].map(x => `<option>${esc(x)}</option>`).join("");
  document.getElementById("anCat").innerHTML = `<option value="all">All categories</option>` + Object.keys(CAT).map(x => `<option>${esc(x)}</option>`).join("");
  if (p) document.getElementById("anPeriod").value = p; if (s) document.getElementById("anStore").value = s; if (c) document.getElementById("anCat").value = c;
}
function renderAnalytics(){
  setupFilters();
  const rows = anRows(), rids = [...new Set(rows.map(r => r.rid))], spent = sum(rows);
  const items = rows.filter(r => r.category !== "Tax"), g = gapDays();
  document.getElementById("anKpis").innerHTML =
    kpiCard("Total spent", money(spent), "cart", "#2F7A3B", `${rids.length} receipts`, "plain") +
    kpiCard("Average basket", money(rids.length ? spent/rids.length : 0), "basket", "#B7791F", "per trip", "plain") +
    kpiCard("Items bought", items.length, "apple", "#7A55B5", `${new Set(items.map(i => i.name)).size} different`, "plain") +
    kpiCard("Shopping rhythm", g ? `${g} days` : "–", "calendar", "#3E7CC2", "between trips", "plain");
  const ms = [...new Set(rows.map(r => monthKey(r.date)))].sort();
  document.getElementById("anMonthly").innerHTML = stackedSVG(ms.map(m => ({label: monthName(m).replace(" 20", " ’"), parts: byCat(rows.filter(r => monthKey(r.date) === m))})));
  const tops = Object.entries(items.reduce((a, l) => (a[l.name] = a[l.name] || {amt:0, cat:l.category}, a[l.name].amt += l.amount, a), {})).sort((a, b) => b[1].amt - a[1].amt).slice(0, 7);
  const tmax = tops.length ? tops[0][1].amt : 1;
  document.getElementById("anTop").innerHTML = tops.length ? tops.map(([n, v]) =>
    `<div class="catrow" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 70px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(title(n))}</span><div class="track"><i style="width:${v.amt/tmax*100}%;background:${cc(v.cat)}"></i></div><span class="right num">${money(v.amt)}</span></div>`).join("") : '<div class="empty">Nothing in this view.</div>';
  const cats = byCat(rows), cmax = cats.length ? cats[0][1] : 1;
  document.getElementById("anCats").innerHTML = cats.length ? cats.map(([c, a]) =>
    `<div class="catrow" role="button" tabindex="0" data-cat="${esc(c)}" style="cursor:pointer"><span class="ci" style="color:${cc(c)}">${ci(c)}</span><span>${esc(c)}</span><div class="track"><i style="width:${a/cmax*100}%;background:${cc(c)}"></i></div><span class="right num">${money(a)}</span><span class="right muted num pct">${Math.round(a/spent*100)}%</span></div>`).join("") : '<div class="empty">Nothing in this view. Try a wider period.</div>';
  document.querySelectorAll("#anCats [data-cat]").forEach(el => { const go = () => drillCat(el.dataset.cat);
    el.addEventListener("click", go); el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
  document.getElementById("anDrill").hidden = true;
}
function drillCat(cat){
  const rows = anRows().filter(r => r.category === cat), box = document.getElementById("anDrill");
  const by = {}; rows.forEach(r => { const o = by[r.name] = by[r.name] || {n:0, qty:0, amt:0, prices:[]}; o.n++; o.qty += r.qty; o.amt += r.amount; o.prices.push([r.date, r.unit_price]); });
  const list = Object.entries(by).sort((a, b) => b[1].amt - a[1].amt);
  box.hidden = false;
  box.innerHTML = `<h2><span style="display:flex;align-items:center;gap:8px"><span style="color:${cc(cat)};font-size:20px">${ci(cat)}</span>${esc(cat)}</span><span class="aside">select an item for its price history</span></h2>
    <div class="tablewrap"><table><thead><tr><th>Item</th><th class="right">Times bought</th><th class="right">Quantity</th><th class="right">Spent</th><th class="right">Last price</th></tr></thead><tbody>${
    list.map(([n, o]) => { o.prices.sort((x, y) => x[0].localeCompare(y[0]));
      return `<tr class="click" data-item="${esc(n)}" tabindex="0"><td>${esc(title(n))}</td><td class="right num">${o.n}</td><td class="right num">${Math.round(o.qty*1000)/1000}</td><td class="right num">${money(o.amt)}</td><td class="right num">${money(o.prices[o.prices.length-1][1])}</td></tr>`; }).join("")}</tbody></table></div><div id="anItem"></div>`;
  box.querySelectorAll("[data-item]").forEach(tr => { const go = () => drillItem(tr.dataset.item);
    tr.addEventListener("click", go); tr.addEventListener("keydown", e => { if (e.key === "Enter") go(); }); });
  box.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
}
function drillItem(name){
  const rows = lines().filter(l => l.name === name).sort((a, b) => a.date.localeCompare(b.date));
  const f = rows[0].unit_price, l = rows[rows.length-1].unit_price, ch = f ? l/f - 1 : 0;
  document.getElementById("anItem").innerHTML = `<div style="margin-top:18px"><h2 style="margin-bottom:6px">${esc(title(name))}</h2>
    <p class="muted" style="margin:0 0 6px">Bought ${rows.length} time${rows.length > 1 ? "s" : ""}. ${rows.length > 1 ? `Price went from ${money(f)} to ${money(l)} (${ch >= 0 ? "+" : ""}${Math.round(ch*100)}%).` : ""}</p>
    ${lineSVG(rows.map(r => ({label: fmt(r.date), value: r.unit_price})))}</div>`;
}
["anPeriod","anStore","anCat"].forEach(id => document.getElementById(id).addEventListener("change", renderAnalytics));

// ---------- REPORTS ----------
function renderReports(){
  const q = document.getElementById("repSearch").value.trim().toLowerCase();
  const rows = lines().filter(l => !q || [l.name, l.store, l.category].join(" ").toLowerCase().includes(q)).sort((a, b) => b.date.localeCompare(a.date));
  document.getElementById("repTable").innerHTML = rows.length ? `<table><thead><tr><th>Date</th><th>Store</th><th>Item</th><th class="right">Qty</th><th class="right">Unit price</th><th class="right">Amount</th><th>Category</th></tr></thead><tbody>${
    rows.map(l => `<tr><td>${fmt(l.date, {day:"numeric",month:"short",year:"numeric"})}</td><td>${esc(l.store)}</td><td>${esc(title(l.name))}</td><td class="right num">${l.qty}${l.unit === "kg" ? " kg" : ""}</td><td class="right num">${money(l.unit_price)}</td><td class="right num">${money(l.amount)}</td><td>${esc(l.category)}</td></tr>`).join("")}</tbody></table>`
    : '<div class="empty">No lines match that search.</div>';
  document.getElementById("delList").innerHTML = [...RECEIPTS].sort((a, b) => b.date.localeCompare(a.date)).map(r =>
    `<label class="check"><input type="checkbox" value="${r.id}" class="delPick"><span>${fmt(r.date, {day:"numeric",month:"short",year:"numeric"})}, ${esc(r.store)}</span><span class="num" style="margin-left:auto">${money(total(r))}</span></label>`).join("") || '<div class="empty">No receipts.</div>';
  document.getElementById("selAll").checked = false;
  document.getElementById("delConfirm").classList.remove("show");
}
document.getElementById("repSearch").addEventListener("input", renderReports);
document.getElementById("selAll").addEventListener("change", e => document.querySelectorAll(".delPick").forEach(c => c.checked = e.target.checked));
document.getElementById("delBtn").addEventListener("click", () => {
  const ids = [...document.querySelectorAll(".delPick:checked")].map(c => c.value);
  if (!ids.length) return toast("Tick at least one receipt first.");
  const n = sum(RECEIPTS.filter(r => ids.includes(r.id)), r => r.items.length + (r.tax ? 1 : 0));
  document.getElementById("delText").textContent = `Delete ${ids.length} receipt${ids.length > 1 ? "s" : ""} and ${n} lines? This can’t be undone.`;
  document.getElementById("delConfirm").classList.add("show");
});
document.getElementById("delNo").addEventListener("click", () => document.getElementById("delConfirm").classList.remove("show"));
document.getElementById("delYes").addEventListener("click", async () => {
  const ids = [...document.querySelectorAll(".delPick:checked")].map(c => c.value);
  try { const r = await call("api_delete", ids); await loadData();
    toast(`Deleted ${r.deleted} receipt${r.deleted === 1 ? "" : "s"} (${r.lines} lines).`);
  } catch (err) { toast("Couldn’t delete: " + (err && err.message || err)); }
});
document.getElementById("exportBtn").addEventListener("click", async () => {
  try {
    const f = await call("api_export"), bytes = Uint8Array.from(atob(f.b64), c => c.charCodeAt(0));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([bytes], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
    a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
    toast("Excel file downloaded.");
  } catch (err) { toast("Couldn’t export: " + (err && err.message || err)); }
});
const QUESTIONS = {
  "Spend by category": "SELECT category, ROUND(SUM(amount), 2) AS spent\nFROM expenses\nGROUP BY category\nORDER BY spent DESC",
  "Spend by month": "SELECT substr(receipt_date, 1, 7) AS month,\n       COUNT(DISTINCT receipt_id) AS trips,\n       ROUND(SUM(amount), 2) AS spent\nFROM expenses\nGROUP BY month\nORDER BY month",
  "Bought more than once": "SELECT item, COUNT(*) AS times_bought,\n       MIN(unit_price) AS lowest, MAX(unit_price) AS highest\nFROM expenses\nWHERE category != 'Tax'\nGROUP BY item\nHAVING COUNT(*) > 1\nORDER BY times_bought DESC",
};
async function runSQL(){
  const q = document.getElementById("qSql").value, out = document.getElementById("qOut"), note = document.getElementById("qNote");
  note.textContent = "Running…";
  try {
    const r = await call("api_sql", q);
    note.textContent = r.note || "";
    out.innerHTML = r.columns.length ? `<table><thead><tr>${r.columns.map(h => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${
      r.rows.map(row => `<tr>${row.map(c => `<td class="num">${c == null ? "" : esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : "";
  } catch (err) { note.textContent = "The query didn’t run: " + (err && err.message || err); out.innerHTML = ""; }
}
function pickQ(name){
  document.querySelectorAll("#qBtns .btn").forEach(b => b.classList.toggle("primary", b.dataset.q === name));
  document.getElementById("qSql").value = QUESTIONS[name]; runSQL();
}
document.getElementById("qBtns").innerHTML = Object.keys(QUESTIONS).map(q => `<button class="btn" data-q="${esc(q)}">${esc(q)}</button>`).join("");
document.querySelectorAll("#qBtns .btn").forEach(b => b.addEventListener("click", () => pickQ(b.dataset.q)));
document.getElementById("qSql").value = QUESTIONS["Spend by category"];
document.getElementById("qRun").addEventListener("click", runSQL);

// ---------- PANTRY ----------
function renderPantry(){
  const by = {}; lines().filter(l => !["Tax","Other"].includes(l.category)).forEach(l => (by[l.name] = by[l.name] || {cat:l.category, dates:new Set()}).dates.add(l.date));
  const today = new Date(), due = [], learning = [];
  Object.entries(by).forEach(([n, o]) => { const ds = [...o.dates].sort();
    if (ds.length < 2){ learning.push(title(n)); return; }
    const gap = (d(ds[ds.length-1]) - d(ds[0])) / 864e5 / (ds.length - 1), next = new Date(d(ds[ds.length-1]).getTime() + gap*864e5);
    const left = Math.round((next - today) / 864e5);
    due.push({n, cat:o.cat, gap:Math.round(gap), last:ds[ds.length-1], left}); });
  due.sort((a, b) => a.left - b.left);
  document.getElementById("pantryDue").innerHTML = due.length ? due.map(p => `<div class="pantry-card ${p.left <= 2 ? "due" : ""}">
      <div class="pi" style="color:${cc(p.cat)}">${ci(p.cat)}</div><b>${esc(title(p.n))}</b>
      <div class="${p.left <= 2 ? "" : "muted"}" style="${p.left <= 2 ? "color:var(--amber-text);font-weight:600" : ""}">${p.left < 0 ? `Probably out ${-p.left} day${p.left === -1 ? "" : "s"} ago` : p.left === 0 ? "Likely out today" : `About ${p.left} day${p.left === 1 ? "" : "s"} left`}</div>
      <div class="muted" style="font-size:13px;margin-top:6px">Usually every ${p.gap} days, last bought ${fmt(p.last)}</div></div>`).join("")
    : '<div class="empty" style="grid-column:1/-1">Buy the same item twice and it shows up here.</div>';
  document.getElementById("pantryLearning").textContent = learning.length ? learning.join(", ") + ": bought once so far." : "Nothing left to learn.";
}

// ---------- OPTIONS ----------
function renderOptions(){
  document.getElementById("budgetIn").value = BUDGET;
  document.getElementById("storageNote").innerHTML = STORAGE === "postgres"
    ? '<span class="chip good">Neon (cloud)</span> Your receipts are saved permanently and are the same on every device.'
    : '<span class="chip warn">This machine only</span> On Colab these are wiped when the session ends. Add your Neon connection string to keep them.';
  document.getElementById("catBudgets").innerHTML = Object.entries(CAT_BUDGETS).map(([c, b]) =>
    `<div class="field"><label for="cb-${esc(c)}" style="display:flex;align-items:center;gap:6px"><span style="color:${cc(c)}">${ci(c)}</span>${esc(c)} ($ per month)</label><input id="cb-${esc(c)}" data-cat="${esc(c)}" type="number" min="0" step="5" value="${b}" class="num cbIn"></div>`).join("");
  const box = document.getElementById("qr");
  box.innerHTML = "";
  call("api_phone_url", location.origin).then(url => {
    if (window.QRCode){ new QRCode(box, {text:url, width:168, height:168, colorDark:"#1F2A22", colorLight:"#FFFFFF"}); }
    else box.textContent = "QR code unavailable.";
    document.getElementById("qrUrl").textContent = url;
  }).catch(() => { box.textContent = "QR code unavailable."; });
}
document.getElementById("saveBudgets").addEventListener("click", () => {
  BUDGET = Math.max(0, +document.getElementById("budgetIn").value || 0);
  document.querySelectorAll(".cbIn").forEach(i => CAT_BUDGETS[i.dataset.cat] = Math.max(0, +i.value || 0));
  call("api_save_budgets", BUDGET, CAT_BUDGETS).then(() => toast("Budgets saved."))
    .catch(err => toast("Couldn’t save budgets: " + (err && err.message || err)));
});

// ---------- navigation ----------
const PAGES = {overview:renderOverview, scan:() => {}, upload:() => {}, analytics:renderAnalytics, reports:renderReports, pantry:renderPantry, options:renderOptions};
const side = document.getElementById("side"), menuBtn = document.getElementById("menuBtn");
function show(){
  const name = PAGES[location.hash.slice(1)] ? location.hash.slice(1) : "overview";
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("on", p.id === "p-" + name));
  document.querySelectorAll(".nav a").forEach(a => a.toggleAttribute("aria-current", a.dataset.page === name) || (a.dataset.page === name && a.setAttribute("aria-current", "page")));
  document.querySelectorAll(".nav a").forEach(a => a.dataset.page === name ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  PAGES[name]();
  side.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
}
document.getElementById("ovMonth").addEventListener("change", renderOverview);
menuBtn.addEventListener("click", () => { const o = side.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", String(o)); });
document.addEventListener("click", e => { if (side.classList.contains("open") && !side.contains(e.target) && !menuBtn.contains(e.target)) { side.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });
let toastT; function toast(msg){ const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 3200); }
async function loadData(){
  const d = await call("api_data");
  RECEIPTS = d.receipts || []; BUDGET = d.budget || 0; STORAGE = d.storage || ""; CAT_BUDGETS = d.cat_budgets || {...DEFAULT_CAT_BUDGETS};
  const name = PAGES[location.hash.slice(1)] ? location.hash.slice(1) : "overview";
  if (name !== "scan" && name !== "upload") PAGES[name]();
}
window.addEventListener("hashchange", show);
(async () => {
  try { await loadData(); }
  catch (err) { toast("Couldn’t load your receipts: " + (err && err.message || err)); }
  const l = document.getElementById("faLoading"); if (l) l.remove();
  show();
})();

})();