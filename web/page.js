(() => {
const IC = {"basket": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\"></path><path d=\"M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M17 10l-2 -6\"></path><path d=\"M7 10l2 -6\"></path></svg>", "overview": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path><path d=\"M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1\"></path><path d=\"M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1\"></path></svg>", "camera": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2\"></path><path d=\"M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0\"></path></svg>", "upload": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 8h.01\"></path><path d=\"M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5\"></path><path d=\"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4\"></path><path d=\"M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54\"></path><path d=\"M16 19h6\"></path><path d=\"M19 16v6\"></path></svg>", "analytics": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-3.8a4.1 4.1 0 1 1 -5 -5v-4a.9 .9 0 0 0 -1 -.8\"></path><path d=\"M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a9 9 0 0 0 -1 -1v-4.5\"></path></svg>", "reports": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 3v4a1 1 0 0 0 1 1h4\"></path><path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\"></path><path d=\"M9 9l1 0\"></path><path d=\"M9 13l6 0\"></path><path d=\"M9 17l6 0\"></path></svg>", "pantry": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -14\"></path><path d=\"M5 10h14\"></path><path d=\"M9 13v3\"></path><path d=\"M9 6v1\"></path></svg>", "options": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 6l8 0\"></path><path d=\"M16 6l4 0\"></path><path d=\"M6 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 12l2 0\"></path><path d=\"M10 12l10 0\"></path><path d=\"M15 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M4 18l11 0\"></path><path d=\"M19 18l1 0\"></path></svg>", "qr": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M7 17l0 .01\"></path><path d=\"M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M7 7l0 .01\"></path><path d=\"M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4\"></path><path d=\"M17 7l0 .01\"></path><path d=\"M14 14l3 0\"></path><path d=\"M20 14l0 .01\"></path><path d=\"M14 14l0 3\"></path><path d=\"M14 20l3 0\"></path><path d=\"M17 17l3 0\"></path><path d=\"M20 17l0 3\"></path></svg>", "menu": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 6l16 0\"></path><path d=\"M4 12l16 0\"></path><path d=\"M4 18l16 0\"></path></svg>", "close": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 6l-12 12\"></path><path d=\"M6 6l12 12\"></path></svg>", "cart": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M17 17h-11v-14h-2\"></path><path d=\"M6 5l14 1l-1 7h-13\"></path></svg>", "receipt": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2\"></path></svg>", "apple": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 11.319c0 3.102 .444 5.319 2.222 7.978c1.351 1.797 3.156 2.247 5.08 .988c.426 -.268 .97 -.268 1.397 0c1.923 1.26 3.728 .809 5.079 -.988c1.778 -2.66 2.222 -4.876 2.222 -7.977c0 -2.661 -1.99 -5.32 -4.444 -5.32c-1.267 0 -2.41 .693 -3.22 1.44a.5 .5 0 0 1 -.672 0c-.809 -.746 -1.953 -1.44 -3.22 -1.44c-2.454 0 -4.444 2.66 -4.444 5.319\"></path><path d=\"M7 12c0 -1.47 .454 -2.34 1.5 -3\"></path><path d=\"M12 7c0 -1.2 .867 -4 3 -4\"></path></svg>", "up": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 17l6 -6l4 4l8 -8\"></path><path d=\"M14 7l7 0l0 7\"></path></svg>", "down": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 7l6 6l4 -4l8 8\"></path><path d=\"M21 10l0 7l-7 0\"></path></svg>", "milk": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 6h8v-2a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v2\"></path><path d=\"M16 6l1.094 1.759a6 6 0 0 1 .906 3.17v8.071a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8.071a6 6 0 0 1 .906 -3.17l1.094 -1.759\"></path><path d=\"M10 16a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\"></path><path d=\"M10 10h4\"></path></svg>", "bag": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304\"></path><path d=\"M9 11v-5a3 3 0 0 1 6 0v5\"></path></svg>", "calendar": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12\"></path><path d=\"M16 3v4\"></path><path d=\"M8 3v4\"></path><path d=\"M4 11h16\"></path><path d=\"M11 15h1\"></path><path d=\"M12 15v3\"></path></svg>", "search": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\"></path><path d=\"M21 21l-6 -6\"></path></svg>", "trash": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 7l16 0\"></path><path d=\"M10 11l0 6\"></path><path d=\"M14 11l0 6\"></path><path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\"></path><path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\"></path></svg>", "download": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path><path d=\"M7 11l5 5l5 -5\"></path><path d=\"M12 4l0 12\"></path></svg>", "cloud": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1\"></path><path d=\"M9 15l3 -3l3 3\"></path><path d=\"M12 12l0 9\"></path></svg>", "check": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 12l5 5l10 -10\"></path></svg>", "warn": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 9v4\"></path><path d=\"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0\"></path><path d=\"M12 16h.01\"></path></svg>", "egg": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083\"></path></svg>", "carrot": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 21s9.834 -3.489 12.684 -6.34a4.487 4.487 0 0 0 0 -6.344a4.483 4.483 0 0 0 -6.342 0c-2.86 2.861 -6.347 12.689 -6.347 12.689l.005 -.005\"></path><path d=\"M9 13l-1.5 -1.5\"></path><path d=\"M16 14l-2 -2\"></path><path d=\"M22 8s-1.14 -2 -3 -2c-1.406 0 -3 2 -3 2s1.14 2 3 2s3 -2 3 -2\"></path><path d=\"M16 2s-2 1.14 -2 3s2 3 2 3s2 -1.577 2 -3c0 -1.86 -2 -3 -2 -3\"></path></svg>", "meat": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.62 8.382l1.966 -1.967a2 2 0 1 1 3.414 -1.415a2 2 0 1 1 -1.413 3.414l-1.82 1.821\"></path><path d=\"M5.904 18.596c2.733 2.734 5.9 4 7.07 2.829c1.172 -1.172 -.094 -4.338 -2.828 -7.071c-2.733 -2.734 -5.9 -4 -7.07 -2.829c-1.172 1.172 .094 4.338 2.828 7.071\"></path><path d=\"M7.5 16l1 1\"></path><path d=\"M12.975 21.425c3.905 -3.906 4.855 -9.288 2.121 -12.021c-2.733 -2.734 -8.115 -1.784 -12.02 2.121\"></path></svg>", "bread": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18 4a3 3 0 0 1 2 5.235v8.765a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-8.764a3 3 0 0 1 1.824 -5.231h12.176v-.005\"></path></svg>", "bottle": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 5h4v-2a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v2\"></path><path d=\"M14 3.5c0 1.626 .507 3.212 1.45 4.537l.05 .07a8.093 8.093 0 0 1 1.5 4.694v6.199a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-6.2c0 -1.682 .524 -3.322 1.5 -4.693l.05 -.07a7.823 7.823 0 0 0 1.45 -4.537\"></path><path d=\"M7 14.803a2.4 2.4 0 0 0 1 -.803a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 1 -.805\"></path></svg>", "candy": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.05 11.293l4.243 -4.243a2 2 0 0 1 2.828 0l2.829 2.83a2 2 0 0 1 0 2.828l-4.243 4.243a2 2 0 0 1 -2.828 0l-2.829 -2.831a2 2 0 0 1 0 -2.828\"></path><path d=\"M16.243 9.172l3.086 -.772a1.5 1.5 0 0 0 .697 -2.516l-2.216 -2.217a1.5 1.5 0 0 0 -2.44 .47l-1.248 2.913\"></path><path d=\"M9.172 16.243l-.772 3.086a1.5 1.5 0 0 1 -2.516 .697l-2.217 -2.216a1.5 1.5 0 0 1 .47 -2.44l2.913 -1.248\"></path></svg>", "snow": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 4l2 1l2 -1\"></path><path d=\"M12 2v6.5l3 1.72\"></path><path d=\"M17.928 6.268l.134 2.232l1.866 1.232\"></path><path d=\"M20.66 7l-5.629 3.25l.01 3.458\"></path><path d=\"M19.928 14.268l-1.866 1.232l-.134 2.232\"></path><path d=\"M20.66 17l-5.629 -3.25l-2.99 1.738\"></path><path d=\"M14 20l-2 -1l-2 1\"></path><path d=\"M12 22v-6.5l-3 -1.72\"></path><path d=\"M6.072 17.732l-.134 -2.232l-1.866 -1.232\"></path><path d=\"M3.34 17l5.629 -3.25l-.01 -3.458\"></path><path d=\"M4.072 9.732l1.866 -1.232l.134 -2.232\"></path><path d=\"M3.34 7l5.629 3.25l2.99 -1.738\"></path></svg>", "cup": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 11h14v-3h-14l0 3\"></path><path d=\"M17.5 11l-1.5 10h-8l-1.5 -10\"></path><path d=\"M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1\"></path><path d=\"M15 5v-2\"></path></svg>", "home": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 12l-2 0l9 -9l9 9l-2 0\"></path><path d=\"M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7\"></path><path d=\"M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6\"></path></svg>", "bath": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1\"></path><path d=\"M6 12v-7a2 2 0 0 1 2 -2h3v2.25\"></path><path d=\"M4 21l1 -1.5\"></path><path d=\"M20 21l-1 -1.5\"></path></svg>", "tag": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\"></path><path d=\"M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3\"></path></svg>", "tax": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 14l6 -6\"></path><path d=\"M9 8.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0\" fill=\"currentColor\"></path><path d=\"M14 13.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0\" fill=\"currentColor\"></path><path d=\"M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2\"></path></svg>", "lemon": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17.536 3.393c3.905 3.906 3.905 10.237 0 14.143c-3.906 3.905 -10.237 3.905 -14.143 0l14.143 -14.143\"></path><path d=\"M5.868 15.06a6.5 6.5 0 0 0 9.193 -9.192\"></path><path d=\"M10.464 10.464l4.597 4.597\"></path><path d=\"M10.464 10.464v6.364\"></path><path d=\"M10.464 10.464h6.364\"></path></svg>", "salad": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1\"></path><path d=\"M18.5 11c.351 -1.017 .426 -2.236 .5 -3.714v-1.286h-2.256c-2.83 0 -4.616 .804 -5.64 2.076\"></path><path d=\"M5.255 11.008a12.204 12.204 0 0 1 -.255 -2.008v-1h1.755c.98 0 1.801 .124 2.479 .35\"></path><path d=\"M8 8l1 -4l4 2.5\"></path><path d=\"M13 11v-.5a2.5 2.5 0 1 0 -5 0v.5\"></path></svg>", "chev": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 6l6 6l-6 6\"></path></svg>", "plus": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 5l0 14\"></path><path d=\"M5 12l14 0\"></path></svg>", "list": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3.5 5.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M3.5 11.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M3.5 17.5l1.5 1.5l2.5 -2.5\"></path><path d=\"M11 6l9 0\"></path><path d=\"M11 12l9 0\"></path><path d=\"M11 18l9 0\"></path></svg>", "clock": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\"></path><path d=\"M12 7v5l3 3\"></path></svg>", "mushroom": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 11.1c0 -4.474 -3.582 -8.1 -8 -8.1s-8 3.626 -8 8.1a.9 .9 0 0 0 .9 .9h14.2a.9 .9 0 0 0 .9 -.9\"></path><path d=\"M10 12v7a2 2 0 1 0 4 0v-7\"></path></svg>", "pepper": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13 11c0 2.21 -2.239 4 -5 4s-5 -1.79 -5 -4a8 8 0 1 0 16 0a3 3 0 0 0 -6 0\"></path><path d=\"M16 8c0 -2 2 -4 4 -4\"></path></svg>", "fish": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.69 7.44a6.973 6.973 0 0 0 -1.69 4.56c0 1.747 .64 3.345 1.699 4.571\"></path><path d=\"M2 9.504c7.715 8.647 14.75 10.265 20 2.498c-5.25 -7.761 -12.285 -6.142 -20 2.504\"></path><path d=\"M18 11v.01\"></path><path d=\"M11.5 10.5c-.667 1 -.667 2 0 3\"></path></svg>", "cheese": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.519 20.008l16.481 -.008v-3.5a2 2 0 1 1 0 -4v-3.5h-16.722\"></path><path d=\"M21 9l-9.385 -4.992c-2.512 .12 -4.758 1.42 -6.327 3.425c-1.423 1.82 -2.288 4.221 -2.288 6.854c0 2.117 .56 4.085 1.519 5.721\"></path><path d=\"M15 13v.01\"></path><path d=\"M8 13v.01\"></path><path d=\"M11 16v.01\"></path></svg>"};
Object.assign(IC, {"patterns": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4\"></path><path d=\"M18 14v4h4\"></path><path d=\"M14 18a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\"></path><path d=\"M15 3v4\"></path><path d=\"M7 3v4\"></path><path d=\"M3 11h16\"></path></svg>", "pencil": "<svg stroke=\"currentColor\" fill=\"none\" stroke-width=\"2\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4\"></path><path d=\"M13.5 6.5l4 4\"></path></svg>"});
IC.back = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 12l14 0"></path><path d="M5 12l6 6"></path><path d="M5 12l6 -6"></path></svg>';
const niceTime = t => { if (!t) return ""; const [h, m] = t.split(":").map(Number); return `${(h % 12) || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };
const CAT = {
  "Produce":["#5E9E4A","carrot"], "Dairy & Eggs":["#5E95CF","milk"], "Meat & Seafood":["#C2453D","meat"],
  "Bakery":["#D29A45","bread"], "Pantry":["#A8794A","bottle"], "Snacks":["#9B5DA8","candy"], "Frozen":["#3FA6BD","snow"],
  "Beverages":["#2E8C8C","cup"], "Household":["#7D8A99","home"], "Personal Care":["#D27FA7","bath"],
  "Other":["#A7AEA9","tag"], "Tax":["#BFC6C1","tax"] };
const cc = c => (CAT[c]||CAT.Other)[0], ci = c => IC[(CAT[c]||CAT.Other)[1]];

let RECEIPTS = [];   // filled from the server by loadData()

const money = v => v == null || isNaN(v) ? "" : "$" + Number(v).toLocaleString("en-CA",{minimumFractionDigits:2,maximumFractionDigits:2});
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
const paidOf = r => sum(r.items) + r.tax;
function fingerprint(a, b){   // 'exact', 'near' or null; mirrors fingerprint_match() in app.py
  // Same store and day are given. Then: transaction ref, then checkout time (to the second when printed),
  // then printed subtotal, then line totals within $1. A different ref or time means a different receipt,
  // unless the printed subtotal also matches (then it may be a misread: flagged as possible).
  const samePrinted = a.printed && b.printed && Math.abs(a.printed_sub - b.printed_sub) < 0.01;
  if (a.ref && b.ref) return a.ref === b.ref ? "exact" : samePrinted ? "near" : null;
  if (a.time && b.time){ const n = Math.min(a.time.length, b.time.length);
    return a.time.slice(0, n) === b.time.slice(0, n) ? "exact" : samePrinted ? "near" : null; }
  const gap = Math.abs(paidOf(a) - paidOf(b));
  return samePrinted || gap < 0.01 ? "exact" : gap <= 1 ? "near" : null;
}
function duplicateFlags(){   // receipt id -> {of, exact} for extra copies of the same receipt
  // Keeps the copy whose lines add up to its printed subtotal (or else the earliest), flags the rest.
  const flags = {}, groups = [];
  const norm = s => String(s || "").trim().toLowerCase();
  const ok = r => r.printed && Math.abs(sum(r.items) - r.printed_sub) < 0.01;
  RECEIPTS.forEach(r => {
    const key = r.date + "|" + norm(r.store);
    const g = groups.find(g => g.key === key && g.list.some(o => fingerprint(r, o)));
    if (g) g.list.push(r); else groups.push({key, list: [r]});
  });
  groups.filter(g => g.list.length > 1).forEach(g => {
    const keep = [...g.list].sort((a, b) => (ok(b) - ok(a)) || a.id.localeCompare(b.id))[0];
    g.list.filter(r => r !== keep).forEach(r => flags[r.id] = {of: keep, exact: fingerprint(r, keep) === "exact"});
  });
  return flags;
}
const sum = (a, f = x => x.amount) => a.reduce((s, x) => s + f(x), 0);
const months = () => [...new Set(RECEIPTS.map(r => monthKey(r.date)))].sort();
function byCat(rows){ const m = {}; rows.forEach(r => m[r.category] = (m[r.category]||0) + r.amount);
  return Object.entries(m).sort((a,b) => b[1]-a[1]); }

// ---------- storage (per-viewer convenience) ----------
const DEFAULT_CAT_BUDGETS = {"Produce":40,"Dairy & Eggs":35,"Meat & Seafood":35,"Pantry":25,"Bakery":15,"Snacks":15};
function load(k, f){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch(e){ return f; } }
function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
let BUDGET = 0, CAT_BUDGETS = {...DEFAULT_CAT_BUDGETS}, STORAGE = "", PREFS = {};

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
function monthBarsSVG(items, selected, budget){
  const W = 520, h = 200, top = 26, bottom = 30, ih = h - top - bottom;
  const max = Math.max(budget || 0, ...items.map(x => x.value)) * 1.12 || 1;
  const slot = (W - 44) / items.length, bw = Math.min(56, slot * 0.55);
  let out = [0, max / 2, max].map(t => { const y = top + ih - (t / max) * ih;
    return `<line x1="40" x2="${W}" y1="${y}" y2="${y}" stroke="var(--line)" ${t ? 'stroke-dasharray="3 4"' : ''}/><text x="34" y="${y + 4}" text-anchor="end" fill="var(--muted)" font-size="11">${money0(t)}</text>`; }).join("");
  items.forEach((x, i) => { const bh = (x.value / max) * ih, cx = 44 + slot * i + slot / 2, on = x.m === selected;
    const over = budget && x.value > budget;
    out += `<rect x="${cx - bw / 2}" y="${top + ih - bh}" width="${bw}" height="${bh}" rx="7" fill="${over ? "#D29A45" : on ? "#2F7A3B" : "#9ECB8A"}"><title>${esc(x.label)}: ${money(x.value)}</title></rect>` +
      `<text x="${cx}" y="${top + ih - bh - 7}" text-anchor="middle" font-size="12" font-weight="${on ? 700 : 600}" fill="var(--ink)" class="num">${money(x.value)}</text>` +
      `<text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="12" fill="${on ? "var(--ink)" : "var(--muted)"}" font-weight="${on ? 600 : 400}">${esc(x.label)}</text>`; });
  if (budget){ const y = top + ih - (budget / max) * ih;
    out += `<line x1="40" x2="${W}" y1="${y}" y2="${y}" stroke="#B7791F" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${W}" y="${y - 5}" text-anchor="end" font-size="11" fill="#B7791F">budget ${money0(budget)}</text>`; }
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
function lineSVG(points, suffix = ""){ // [{label, value}]
  const W = 520, h = 170, top = 28, bottom = 28, ih = h - top - bottom;
  const max = Math.max(...points.map(p => p.value)) * 1.25 || 1, step = points.length > 1 ? (W - 80) / (points.length - 1) : 0;
  const xy = points.map((p, i) => [40 + (points.length > 1 ? i*step : (W-80)/2), top + ih - (p.value/max)*ih]);
  const path = xy.map((q, i) => (i ? "L" : "M") + q[0] + " " + q[1]).join(" ");
  return `<svg viewBox="0 0 ${W} ${h}" width="100%" role="img" aria-label="Price history">
    <line x1="30" x2="${W}" y1="${top+ih}" y2="${top+ih}" stroke="var(--line)"/>
    <path d="${path}" fill="none" stroke="var(--leaf)" stroke-width="2.5" stroke-linejoin="round"/>
    ${xy.map((q, i) => `<circle cx="${q[0]}" cy="${q[1]}" r="5" fill="var(--leaf)"/><text x="${q[0]}" y="${q[1]-11}" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)" class="num">${money(points[i].value)}${suffix}</text><text x="${q[0]}" y="${h-8}" text-anchor="middle" font-size="12" fill="var(--muted)">${esc(points[i].label)}</text>`).join("")}
  </svg>`;
}
function kpiCard(label, value, icon, color, chip, chipTone = "good", sub = ""){
  return `<div class="panel kpi"><div><div class="lab">${label}</div><div class="val num">${value}</div>
    <span class="chip ${chipTone}">${chip}</span>${sub ? `<span class="sub">${sub}</span>` : ""}</div>
    <div class="ic" style="background:${color}">${IC[icon]}</div></div>`;
}

// ---------- prices ----------
// Weighed items (bananas, plums) compare price per kg; everything else compares price per item.
// A purchase read without its weight can't be compared per kg, so it's left out of that item's history.
function priceSeries(name){
  const rows = lines().filter(l => l.name === name && l.category !== "Tax").sort((a, b) => a.date.localeCompare(b.date));
  const kg = rows.filter(l => l.unit === "kg" && l.qty > 0);
  const useKg = kg.length > 0, pts = useKg ? kg : rows;
  return {unit: useKg ? "/kg" : " each", left: rows.length - pts.length, all: rows.length,
          points: pts.map(l => ({date: l.date, value: useKg ? (l.unit_price || l.amount / l.qty) : (l.unit_price || l.amount / (l.qty || 1))}))};
}
// ---------- insights ----------
function priceChanges(){
  const names = [...new Set(lines().filter(l => l.category !== "Tax").map(l => l.name))];
  return names.map(n => { const s = priceSeries(n), p = s.points; if (p.length < 2) return null;
    const f = p[0].value, l = p[p.length - 1].value;
    return {name: n, first: f, last: l, from: p[0].date, change: f ? l / f - 1 : 0, count: p.length, unit: s.unit}; }).filter(Boolean);
}
const medianOf = a => { const s = [...a].sort((x, y) => x - y), m = s.length; return m ? (m % 2 ? s[(m - 1) / 2] : (s[m / 2 - 1] + s[m / 2]) / 2) : null; };
const gapsOf = ds => ds.slice(1).map((x, i) => (d(x) - d(ds[i])) / 864e5);
function gapDays(){   // typical days between trips: the median gap, so one odd trip can't skew it
  const ds = [...new Set(RECEIPTS.map(r => r.date))].sort(); if (ds.length < 2) return null;
  return Math.max(1, Math.round(medianOf(gapsOf(ds))));
}
const title = s => s.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase());

// ---------- DASHBOARD (one page: overview + analytics) ----------
// Every number here is the items read from your receipts plus tax, the same as Home and Receipts,
// so charts, donut and totals always agree.
let PERIOD = load("fa_period", null);           // null = this month; "all"; or a list of "YYYY-MM"
function selMonths(){
  const ms = months(); if (!ms.length) return [];
  if (PERIOD === "all") return ms;
  if (Array.isArray(PERIOD)){ const s = PERIOD.filter(m => ms.includes(m)); if (s.length) return s.sort(); }
  return [ms[ms.length - 1]];
}
function periodLabel(sel){
  const ms = months();
  if (!sel.length) return "No receipts yet";
  if (sel.length === ms.length && ms.length > 1) return "All time";
  if (sel.length === 1) return monthName(sel[0]);
  const contiguous = sel.every((m, i) => !i || ms.indexOf(m) === ms.indexOf(sel[i - 1]) + 1);
  return contiguous ? `${monthName(sel[0]).split(" ")[0]} – ${monthName(sel[sel.length - 1])}` : `${sel.length} months`;
}
function dashReceipts(){
  const sel = new Set(selMonths()), st = document.getElementById("ovStore").value || "all";
  return RECEIPTS.filter(r => sel.has(monthKey(r.date)) && (st === "all" || r.store === st));
}
function dashLines(){ const ids = new Set(dashReceipts().map(r => r.id)); return lines().filter(l => ids.has(l.rid)); }
function partsOf(rs){   // category -> amount for these receipts (items + tax)
  const m = {};
  rs.forEach(r => { r.items.forEach(i => m[i.category] = (m[i.category] || 0) + i.amount);
                    if (r.tax) m.Tax = (m.Tax || 0) + r.tax; });
  return Object.entries(m).filter(([, a]) => a > 0.004).sort((a, b) => b[1] - a[1]);
}
function setupSlicer(){
  const ms = months(), sel = selMonths();
  document.getElementById("pdBtn").innerHTML = `${IC.calendar}<span class="lbl">${esc(periodLabel(sel))}</span>${IC.chev}`;
  document.getElementById("pdList").innerHTML = [...ms].reverse().map(m =>
    `<label class="ck"><input type="checkbox" data-m="${m}" ${sel.includes(m) ? "checked" : ""}> ${monthName(m)}</label>`).join("");
  document.getElementById("pdAll").checked = ms.length && sel.length === ms.length;
  const q = PERIOD === "all" ? "all" : !Array.isArray(PERIOD) ? "1" : null;
  document.querySelectorAll("#pdQuick button").forEach(b => b.classList.toggle("on", b.dataset.q === q));
  const st = document.getElementById("ovStore"), keep = st.value;
  st.innerHTML = `<option value="all">All stores</option>` + [...new Set(RECEIPTS.map(r => r.store))].sort().map(x => `<option>${esc(x)}</option>`).join("");
  if (keep && [...st.options].some(o => o.value === keep)) st.value = keep;
}
function setPeriod(p){ PERIOD = p; save("fa_period", p); renderOverview(); }
document.getElementById("pdBtn").addEventListener("click", e => {
  e.stopPropagation(); const pop = document.getElementById("pdPop"); pop.hidden = !pop.hidden;
  document.getElementById("pdBtn").setAttribute("aria-expanded", String(!pop.hidden)); });
document.getElementById("pdPop").addEventListener("click", e => e.stopPropagation());
document.addEventListener("click", () => { const pop = document.getElementById("pdPop"); if (pop && !pop.hidden){ pop.hidden = true; document.getElementById("pdBtn").setAttribute("aria-expanded", "false"); } });
document.getElementById("pdQuick").addEventListener("click", e => {
  const q = e.target.dataset && e.target.dataset.q; if (!q) return;
  const ms = months();
  document.getElementById("pdPop").hidden = true; document.getElementById("pdBtn").setAttribute("aria-expanded", "false");
  setPeriod(q === "all" ? "all" : q === "1" ? null : ms.slice(-(+q)));
});
document.getElementById("pdAll").addEventListener("change", e => setPeriod(e.target.checked ? "all" : null));
document.getElementById("pdList").addEventListener("change", () => {
  const picked = [...document.querySelectorAll("#pdList input:checked")].map(i => i.dataset.m);
  setPeriod(!picked.length ? null : picked.length === months().length ? "all" : picked.sort());
});
document.getElementById("ovStore").addEventListener("change", renderOverview);

function renderOverview(){
  setupSlicer();
  const ms = months(), sel = selMonths(), one = sel.length === 1;
  if (!ms.length){
    document.getElementById("ovKpis").innerHTML = '<div class="panel empty" style="grid-column:1/-1">No receipts yet. <a href="#scan" style="color:var(--leaf-text)">Scan your first one</a> to see your dashboard.</div>';
    ["ovTrips","ovDonut","anTop","anCats","ovInsights","ovBudgets"].forEach(id => document.getElementById(id).innerHTML = '<div class="empty">Nothing yet.</div>');
    document.getElementById("ovDonutLabel").textContent = ""; return; }
  const rs = dashReceipts(), label = periodLabel(sel);
  const prev = one ? ms[ms.indexOf(sel[0]) - 1] : null;
  const st = document.getElementById("ovStore").value;
  const prs = prev ? RECEIPTS.filter(r => monthKey(r.date) === prev && (st === "all" || r.store === st)) : [];
  const spent = sum(rs, total), trips = rs.length, avg = trips ? spent / trips : 0, pavg = prs.length ? sum(prs, total) / prs.length : 0;
  const nItems = sum(rs, r => r.items.length), g = gapDays();
  const pct = BUDGET ? spent / BUDGET : 0, tone = pct < .8 ? "good" : pct <= 1 ? "warn" : "bad";
  document.getElementById("ovSub").textContent = `${label}${st && st !== "all" ? " · " + st : ""}`;
  document.getElementById("ovKpis").innerHTML =
    kpiCard("Spent", money(spent), "cart", "#2F7A3B",
      one ? (BUDGET ? `${Math.round(pct * 100)}% of ${money0(BUDGET)} ${IC.pencil}` : `Set a budget ${IC.pencil}`) : `${money(spent / sel.length)} a month`,
      one && BUDGET ? tone : one ? "good" : "plain") +
    kpiCard("Trips", trips, "receipt", "#3E7CC2", g ? `about every ${g} days` : "first trips", "plain") +
    kpiCard("Average basket", money(avg), "basket", "#B7791F",
      pavg ? `${avg >= pavg ? IC.up : IC.down} ${money0(Math.abs(avg - pavg))}` : "per trip", pavg && avg > pavg ? "warn" : pavg ? "good" : "plain", pavg ? `vs ${monthName(prev).split(" ")[0]}` : "") +
    kpiCard("Items", nItems, "apple", "#7A55B5", trips ? `${Math.round(nItems / trips)} per trip` : "–", "plain");
  const bchip = one ? document.querySelector("#ovKpis .panel .chip") : null;
  if (bchip){ bchip.classList.add("clickable"); bchip.setAttribute("role", "button"); bchip.tabIndex = 0;
    bchip.title = "Set your monthly grocery budget";
    bchip.onclick = () => openBudget(); bchip.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBudget(); } }; }

  const short = m => monthName(m).replace(/ 20(\d\d)$/, " ’$1");
  const inMonth = m => rs.filter(r => monthKey(r.date) === m);
  if (one){   // one month: only that month, one bar per shopping trip
    const trips = [...rs].sort((a, b) => a.date.localeCompare(b.date) || String(a.time || "").localeCompare(String(b.time || "")));
    document.getElementById("ovTrips").innerHTML = stackedSVG(trips.map(r => ({label: fmt(r.date, {day: "numeric", month: "short"}), parts: partsOf([r])})));
    document.getElementById("ovTripsLabel").textContent = `each trip in ${monthName(sel[0]).split(" ")[0]}`;
  } else {
    document.getElementById("ovTrips").innerHTML = stackedSVG(sel.map(m => ({label: short(m), parts: partsOf(inMonth(m))})));
    document.getElementById("ovTripsLabel").textContent = "by category";
  }
  document.getElementById("ovDonutLabel").textContent = label;
  document.getElementById("ovDonut").innerHTML = donutHTML(partsOf(rs));

  const items = dashLines().filter(l => l.category !== "Tax");
  const tops = Object.entries(items.reduce((a, l) => (a[l.name] = a[l.name] || {amt: 0, cat: l.category}, a[l.name].amt += l.amount, a), {})).sort((a, b) => b[1].amt - a[1].amt).slice(0, 7);
  const tmax = tops.length ? tops[0][1].amt : 1;
  document.getElementById("anTop").innerHTML = tops.length ? tops.map(([n, v]) =>
    `<div class="catrow" style="grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) 70px"><span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(title(n))}</span><div class="track"><i style="width:${v.amt / tmax * 100}%;background:${cc(v.cat)}"></i></div><span class="right num">${money(v.amt)}</span></div>`).join("") : '<div class="empty">Nothing in this period.</div>';
  const cats = partsOf(rs), cmax = cats.length ? cats[0][1] : 1;
  document.getElementById("anCats").innerHTML = cats.length ? cats.map(([c, a]) => {
    const drill = c !== "Tax";
    return `<div class="catrow" ${drill ? `role="button" tabindex="0" data-cat="${esc(c)}" style="cursor:pointer"` : ""}><span class="ci" style="color:${cc(c)}">${ci(c)}</span><span>${esc(c)}</span><div class="track"><i style="width:${a / cmax * 100}%;background:${cc(c)}"></i></div><span class="right num">${money(a)}</span><span class="right muted num pct">${Math.round(a / spent * 100)}%</span></div>`; }).join("")
    : '<div class="empty">Nothing in this period. Try a wider one.</div>';
  document.querySelectorAll("#anCats [data-cat]").forEach(el => { const go = () => drillCat(el.dataset.cat);
    el.addEventListener("click", go); el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }); });
  document.getElementById("anDrill").hidden = true;

  const ins = [], up = priceChanges().filter(p => p.change > .005).sort((a, b) => b.change - a.change)[0];
  if (up) ins.push(["#B7791F", "up", `${title(up.name)} up ${Math.round(up.change * 100)}%`, `${money(up.first)}${up.unit} → ${money(up.last)}${up.unit} since ${fmt(up.from)}`]);
  const ic = cats.filter(([c]) => c !== "Tax");
  if (ic.length) ins.push([cc(ic[0][0]), (CAT[ic[0][0]] || CAT.Other)[1], `${ic[0][0]} leads`, `${Math.round(ic[0][1] / spent * 100)}% of ${label}`]);
  const bags = sum(items.filter(l => /REUBL|BAG/i.test(l.name)));
  if (bags) ins.push(["#2F7A3B", "bag", `Bags: ${money(bags)}`, "Bring your own to skip the fee"]);
  if (g) ins.push(["#3E7CC2", "calendar", `You shop about every ${g} days`, `${RECEIPTS.length} trips recorded`]);
  document.getElementById("ovInsights").innerHTML = ins.slice(0, 4).map(([c, i, b, s]) =>
    `<div class="ins"><div class="ic" style="background:${c}">${IC[i]}</div><div><b>${esc(b)}</b><span class="muted">${esc(s)}</span></div></div>`).join("") || '<div class="empty">Scan a few more receipts for insights.</div>';

  document.getElementById("ovBudgetsPanel").hidden = !one;      // monthly budgets only make sense for one month
  if (one){ const mc = Object.fromEntries(partsOf(rs));
    document.getElementById("ovBudgets").innerHTML = Object.entries(CAT_BUDGETS).map(([c, b]) => {
      const s = mc[c] || 0, p = b ? s / b : 0, col = p <= .8 ? cc(c) : p <= 1 ? "#D29A45" : "#C2453D";
      return `<div><div class="budget-row"><span style="display:flex;align-items:center;gap:6px"><span style="color:${cc(c)};font-size:17px">${ci(c)}</span>${esc(c)}</span><span class="muted num">${money0(s)} of ${money0(b)}</span></div>
        <div class="track"><i style="width:${Math.min(p, 1) * 100}%;background:${col}"></i></div></div>`; }).join(""); }
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
    if (res.kind === "saved" || res.kind === "duplicate"){
      box.insertAdjacentHTML("afterbegin", `<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">
        ${res.receipt_id ? '<button class="btn primary" id="scanView">View receipt</button>' : ""}
        <button class="btn" id="scanAgain">${IC.camera}Scan another</button></div>`);
      const v = document.getElementById("scanView");
      if (v) v.onclick = () => openReceipt(res.receipt_id);
      document.getElementById("scanAgain").onclick = () => document.getElementById("scanFile").click();
    }
    if (res.kind === "saved"){ await loadData(); maybePromptBudget(); }
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
  document.getElementById("bulkCount").textContent = `${saved} of ${rows.length} saved` + (check ? `, ${check} to check in Receipts` : "");
  e.target.value = ""; await loadData();
  if (saved) maybePromptBudget();
});

// ---------- drill-down (used by the Dashboard) ----------
function drillCat(cat){
  const rows = dashLines().filter(r => r.category === cat), box = document.getElementById("anDrill");
  const by = {}; rows.forEach(r => { const o = by[r.name] = by[r.name] || {n:0, qty:0, kg:0, amt:0, prices:[]}; o.n++; o.qty += r.qty; if (r.unit === "kg") o.kg += r.qty; o.amt += r.amount; o.prices.push([r.date, r.unit_price]); });
  const list = Object.entries(by).sort((a, b) => b[1].amt - a[1].amt);
  box.hidden = false;
  box.innerHTML = `<h2><span style="display:flex;align-items:center;gap:8px"><span style="color:${cc(cat)};font-size:20px">${ci(cat)}</span>${esc(cat)}</span><span class="aside">select an item for its price history</span></h2>
    <div class="tablewrap"><table><thead><tr><th>Item</th><th class="right">Times bought</th><th class="right">Quantity</th><th class="right">Spent</th><th class="right">Last price</th></tr></thead><tbody>${
    list.map(([n, o]) => { o.prices.sort((x, y) => x[0].localeCompare(y[0]));
      return `<tr class="click" data-item="${esc(n)}" tabindex="0"><td>${esc(title(n))}</td><td class="right num">${o.n}</td><td class="right num">${o.kg ? Math.round(o.kg * 1000) / 1000 + " kg" : o.n === o.qty ? o.qty : Math.round(o.qty * 1000) / 1000}</td><td class="right num">${money(o.amt)}</td><td class="right num">${(() => { const s = priceSeries(n), p = s.points; return p.length ? money(p[p.length - 1].value) + (s.unit === "/kg" ? "/kg" : "") : "–"; })()}</td></tr>`; }).join("")}</tbody></table></div><div id="anItem"></div>`;
  box.querySelectorAll("[data-item]").forEach(tr => { const go = () => drillItem(tr.dataset.item);
    tr.addEventListener("click", go); tr.addEventListener("keydown", e => { if (e.key === "Enter") go(); }); });
  box.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
}
function drillItem(name){
  const s = priceSeries(name), p = s.points, f = p[0].value, l = p[p.length - 1].value, ch = f ? l / f - 1 : 0;
  const what = s.unit === "/kg" ? "Price per kg" : "Price per item";
  const note = s.left ? ` ${s.left} purchase${s.left > 1 ? "s were" : " was"} read without a weight, so ${s.left > 1 ? "they aren’t" : "it isn’t"} shown.` : "";
  document.getElementById("anItem").innerHTML = `<div style="margin-top:18px"><h2 style="margin-bottom:6px">${esc(title(name))} <span class="aside">${what}</span></h2>
    <p class="muted" style="margin:0 0 6px">Bought ${s.all} time${s.all > 1 ? "s" : ""}.${p.length > 1 ? ` ${what} went from ${money(f)}${s.unit} to ${money(l)}${s.unit} (${ch >= 0 ? "+" : ""}${Math.round(ch * 100)}%).` : ""}${note}</p>
    ${lineSVG(p.map(x => ({label: fmt(x.date), value: x.value})), s.unit === "/kg" ? "/kg" : "")}</div>`;
}

// ---------- REPORTS ----------
function renderReports(){
  const q = document.getElementById("repSearch").value.trim().toLowerCase();
  const rows = lines().filter(l => !q || [l.name, l.store, l.category].join(" ").toLowerCase().includes(q)).sort((a, b) => b.date.localeCompare(a.date));
  document.getElementById("repTable").innerHTML = rows.length ? `<table><thead><tr><th>Date</th><th>Store</th><th>Item</th><th class="right">Qty</th><th class="right">Unit price</th><th class="right">Amount</th><th>Category</th></tr></thead><tbody>${
    rows.map(l => `<tr><td>${fmt(l.date, {day:"numeric",month:"short",year:"numeric"})}</td><td>${esc(l.store)}</td><td>${esc(title(l.name))}</td><td class="right num">${l.qty}${l.unit === "kg" ? " kg" : ""}</td><td class="right num">${money(l.unit_price)}</td><td class="right num">${money(l.amount)}</td><td>${esc(l.category)}</td></tr>`).join("")}</tbody></table>`
    : '<div class="empty">No lines match that search.</div>';
  const dups = duplicateFlags(), nd = Object.keys(dups).length;
  document.getElementById("dupBanner").innerHTML = nd ? `<div class="status warn" style="margin-bottom:10px">${IC.warn}<div><b>${nd} receipt${nd === 1 ? " looks" : "s look"} like ${nd === 1 ? "a duplicate" : "duplicates"}</b> of one already saved (same store and day, same total). <button class="btn" id="dupSelect" style="margin-top:8px">Select duplicates</button></div></div>` : "";
  document.getElementById("delList").innerHTML = [...RECEIPTS].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).map(r =>
    `<label class="check"><input type="checkbox" value="${r.id}" class="delPick"><span>${fmt(r.date, {day:"numeric",month:"short",year:"numeric"})}, ${esc(r.store)}${r.time ? `<span class="muted">, ${niceTime(r.time)}</span>` : ""}</span>${dups[r.id] ? `<span class="chip ${dups[r.id].exact ? "bad" : "warn"}" style="margin-left:8px">${dups[r.id].exact ? "Duplicate" : "Possible duplicate"}</span>` : ""}<span class="num" style="margin-left:auto">${money(total(r))}</span></label>`).join("") || '<div class="empty">No receipts.</div>';
  const ds = document.getElementById("dupSelect");
  if (ds) ds.onclick = () => { document.querySelectorAll(".delPick").forEach(c => c.checked = !!dups[c.value]);
    toast("Ticked the extra copies. Check them, then press Delete selected."); };
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
document.getElementById("exportBtn").addEventListener("click", downloadExcel);
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
  // An item gets a prediction once it's bought on 2+ different days. Its rhythm is the typical (median)
  // gap between purchases; days left = last purchase + rhythm - today.
  const by = {}; lines().filter(l => !["Tax","Other","Household"].includes(l.category))
    .forEach(l => (by[l.name] = by[l.name] || {cat: l.category, dates: new Set()}).dates.add(l.date));
  const today = new Date(new Date().toDateString()), soon = [], later = [], learning = [], rare = [];
  Object.entries(by).forEach(([n, o]) => { const ds = [...o.dates].sort();
    if (ds.length < 2){ learning.push(title(n)); return; }
    const gap = medianOf(gapsOf(ds));
    if (gap > 90){ rare.push(title(n)); return; }                 // months apart: not a real rhythm yet
    const last = ds[ds.length - 1], left = Math.round((d(last).getTime() + gap * 864e5 - today) / 864e5);
    (left <= 7 ? soon : later).push({n, cat: o.cat, gap: Math.round(gap), last, left, times: ds.length}); });
  const card = p => `<div class="pantry-card ${p.left <= 2 ? "due" : ""}">
      <div class="pi" style="color:${cc(p.cat)}">${ci(p.cat)}</div><b>${esc(title(p.n))}</b>
      <div class="${p.left <= 2 ? "" : "muted"}" style="${p.left <= 2 ? "color:var(--amber-text);font-weight:600" : ""}">${p.left < 0 ? `Probably ran out ${-p.left} day${p.left === -1 ? "" : "s"} ago` : p.left === 0 ? "Likely out today" : `About ${p.left} day${p.left === 1 ? "" : "s"} left`}</div>
      <div class="muted" style="font-size:13px;margin-top:6px">Every ~${p.gap} days (${p.times} buys), last ${fmt(p.last)}</div></div>`;
  soon.sort((a, b) => a.left - b.left); later.sort((a, b) => a.left - b.left);
  document.getElementById("pantryDue").innerHTML = soon.length ? soon.map(card).join("")
    : '<div class="empty" style="grid-column:1/-1">Nothing due in the next week.</div>';
  document.getElementById("pantryLater").innerHTML = later.length ? later.map(card).join("")
    : '<div class="empty" style="grid-column:1/-1">Items bought regularly show up here.</div>';
  const notes = [];
  if (learning.length) notes.push(learning.join(", ") + ": bought once so far.");
  if (rare.length) notes.push(rare.join(", ") + ": bought months apart, so no prediction yet.");
  document.getElementById("pantryLearning").textContent = notes.join(" ") || "Nothing left to learn.";
}

// ---------- SETTINGS ----------
function renderSettings(){
  document.getElementById("stBudgetNote").textContent = BUDGET ? `${money0(BUDGET)} a month` : "Not set. Home shows spending against last month instead.";
  document.getElementById("stBudget").textContent = BUDGET ? "Change" : "Set";
  document.getElementById("stMore").checked = !!PREFS.show_advanced;
  document.getElementById("stCats").hidden = !PREFS.show_advanced;
  document.getElementById("storageNote").innerHTML = STORAGE === "postgres"
    ? '<span class="chip good">Neon (cloud)</span> Saved permanently, the same on every device.'
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
  document.querySelectorAll(".cbIn").forEach(i => CAT_BUDGETS[i.dataset.cat] = Math.max(0, +i.value || 0));
  call("api_save_budgets", BUDGET, CAT_BUDGETS).then(() => toast("Category budgets saved."))
    .catch(err => toast("Couldn’t save: " + (err && err.message || err)));
});
document.getElementById("stBudget").addEventListener("click", () => openBudget());
document.getElementById("stMore").addEventListener("change", async e => {
  PREFS.show_advanced = e.target.checked; applyPrefs(); renderSettings();
  try { await call("api_set_pref", "show_advanced", e.target.checked); }
  catch (err) { toast("Couldn’t save that setting: " + (err && err.message || err)); }
});
async function downloadExcel(){
  try {
    const f = await call("api_export"), bytes = Uint8Array.from(atob(f.b64), c => c.charCodeAt(0));
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([bytes], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}));
    a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
    toast("Excel file downloaded.");
  } catch (err) { toast("Couldn’t export: " + (err && err.message || err)); }
}
["stExport", "rcExport"].forEach(id => document.getElementById(id).addEventListener("click", downloadExcel));

// ---------- HOME ----------
const AV = ["#2F7A3B","#3E7CC2","#B7791F","#2E8C8C","#5E9E4A","#55606E"];   // no pink
const avColor = s => AV[[...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % AV.length];
const avatar = s => `<span class="av" style="background:${avColor(s)}">${esc((String(s).trim()[0] || "?").toUpperCase())}</span>`;
function statusChip(r, dups){
  if (dups[r.id]) return `<span class="chip ${dups[r.id].exact ? "bad" : "warn"}">${dups[r.id].exact ? "Duplicate" : "Possible duplicate"}</span>`;
  if (r.printed && Math.abs(sum(r.items) - r.printed_sub) >= 0.01) return '<span class="chip warn">Check items</span>';
  return "";
}
const rowHTML = (r, dups, sel) => `<button class="row${sel ? " sel" : ""}" data-rid="${esc(r.id)}">${avatar(r.store)}
  <span class="t"><b>${esc(r.store)}</b><span>${fmt(r.date, {weekday:"short", day:"numeric", month:"short"})}${r.time ? ", " + niceTime(r.time) : ""} · ${r.items.length} items</span></span>
  <span class="amt num">${money(total(r))}${statusChip(r, dups)}</span></button>`;
function wireRows(root){ root.querySelectorAll("[data-rid]").forEach(b => b.onclick = () => openReceipt(b.dataset.rid)); }
function renderHome(){
  const hr = new Date().getHours();
  document.getElementById("hmHello").textContent = hr < 12 ? "Good morning" : hr < 18 ? "Good afternoon" : "Good evening";
  const now = new Date(), cur = now.toISOString().slice(0, 7);
  const prevD = new Date(now.getFullYear(), now.getMonth() - 1, 15), prev = prevD.toISOString().slice(0, 7);
  const inM = m => RECEIPTS.filter(r => monthKey(r.date) === m);
  const spent = sum(inM(cur), total), last = sum(inM(prev), total);
  const mName = now.toLocaleDateString("en-GB", {month: "long"});
  let foot;
  if (BUDGET){
    const left = BUDGET - spent, p = Math.min(spent / BUDGET, 1);
    foot = `<div class="meter"><i class="${left < 0 ? "over" : ""}" style="width:${p * 100}%"></i></div>
      <div class="foot"><span>${left >= 0 ? `${money(left)} left of ${money0(BUDGET)}` : `${money(-left)} over your ${money0(BUDGET)} budget`}</span><button class="link" data-budget>Change</button></div>`;
  } else {
    // Same point last month, so a half-finished month isn't compared with a whole one
    const day = now.getDate(), lastSoFar = sum(inM(prev).filter(r => +r.date.slice(8, 10) <= day), total);
    const cmp = lastSoFar ? `${spent <= lastSoFar ? IC.down : IC.up}` : "";
    foot = `<div class="foot"><span style="display:flex;align-items:center;gap:6px">${lastSoFar
        ? `${cmp}${money(Math.abs(spent - lastSoFar))} ${spent <= lastSoFar ? "less" : "more"} than this point last month`
        : last ? `${money(last)} in all of ${prevD.toLocaleDateString("en-GB", {month: "long"})}` : "Your first month"}</span>
      <button class="link" data-budget>Set a budget</button></div>`;
  }
  document.getElementById("hmHero").innerHTML = `<div class="lab">Spent in ${mName}</div><div class="big num">${money(spent)}</div>${foot}`;
  document.querySelectorAll("#hmHero [data-budget]").forEach(b => b.onclick = () => openBudget());

  const cats = byCat(lines().filter(l => monthKey(l.date) === cur && l.category !== "Tax")), top = cats.length ? cats[0][1] : 1;
  document.getElementById("hmCats").innerHTML = cats.length ? cats.slice(0, 5).map(([c, a]) =>
    `<div class="cbar"><span class="ci" style="background:${cc(c)}22;color:${cc(c)}">${ci(c)}</span>
      <div><div class="nm"><span>${esc(c)}</span><span class="num">${money(a)}</span></div><div class="track"><i style="width:${a / top * 100}%;background:${cc(c)}"></i></div></div><span></span></div>`).join("")
    : `<div class="empty">Nothing scanned in ${mName} yet.</div>`;
  const dups = duplicateFlags(), recent = [...RECEIPTS].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)).slice(0, 4);
  const box = document.getElementById("hmRecent");
  box.innerHTML = recent.length ? recent.map(r => rowHTML(r, dups)).join("")
    : '<div class="empty">No receipts yet. Tap <b>Scan</b> to add your first one.</div>';
  wireRows(box);
}
document.getElementById("hmBudget").addEventListener("click", () => openBudget());

// ---------- RECEIPTS ----------
let SEL_RC = null, CONFIRM_DEL = false, EDIT_LINE = null;   // EDIT_LINE: a line_id, or "new"
function suspects(r){   // line_ids that look shifted (same amount as a neighbour, or weight x price != amount)
  const s = new Set(), it = r.items;
  it.forEach((a, k) => { const b = it[k + 1];
    if (b && Math.abs(a.amount - b.amount) < 0.005 && a.name !== b.name){ s.add(a.line_id); s.add(b.line_id); }
    if (a.unit === "kg" && a.qty && a.unit_price != null && Math.abs(a.qty * a.unit_price - a.amount) > 0.02) s.add(a.line_id); });
  return s;
}
function lineForm(i){   // inline editor for one line (or a new one)
  const cats = Object.keys(CAT).filter(c => c !== "Tax"), kg = i.unit === "kg";
  return `<form class="lineform" data-id="${i.line_id || "new"}">
    <label class="lf-wide">Item<input name="name" value="${esc(i.name || "")}" required></label>
    <label>Sold<select name="unit"><option value="ea"${kg ? "" : " selected"}>each</option><option value="kg"${kg ? " selected" : ""}>by weight (kg)</option></select></label>
    <label><span class="lf-q">${kg ? "Weight (kg)" : "Quantity"}</span><input name="qty" type="number" step="0.001" min="0" inputmode="decimal" value="${i.qty ?? 1}"></label>
    <label><span class="lf-p">${kg ? "Price per kg" : "Price each"}</span><input name="unit_price" type="number" step="0.01" min="0" inputmode="decimal" value="${i.unit_price ?? ""}"></label>
    <label>Amount paid<input name="amount" type="number" step="0.01" min="0" inputmode="decimal" value="${i.amount ?? ""}" required></label>
    <label class="lf-wide">Category<select name="category">${cats.map(c => `<option${c === (i.category || "Produce") ? " selected" : ""}>${esc(c)}</option>`).join("")}</select></label>
    <div class="lf-btns">${i.line_id ? `<button type="button" class="btn danger lf-del">${IC.trash}Remove line</button>` : ""}<span style="flex:1"></span>
      <button type="button" class="btn lf-cancel">Cancel</button><button type="submit" class="btn primary">Save</button></div>
  </form>`;
}
function openReceipt(id){
  SEL_RC = id; CONFIRM_DEL = false; EDIT_LINE = null;
  if (location.hash !== "#receipts") location.hash = "#receipts"; else renderReceipts();
  document.getElementById("rcWrap").classList.add("open");
}
function renderReceipts(){
  const q = document.getElementById("rcSearch").value.trim().toLowerCase(), dups = duplicateFlags();
  const list = [...RECEIPTS].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .filter(r => !q || (r.store + " " + r.items.map(i => i.name).join(" ")).toLowerCase().includes(q));
  document.getElementById("rcCount").textContent = `${RECEIPTS.length} receipt${RECEIPTS.length === 1 ? "" : "s"}, ${money(sum(RECEIPTS, total))} in all`;
  const nd = Object.keys(dups).length;
  document.getElementById("rcDup").innerHTML = nd ? `<div class="status warn">${IC.warn}<div><b>${nd} receipt${nd === 1 ? " looks" : "s look"} like ${nd === 1 ? "a copy" : "copies"}</b> of one already saved (same store, day and checkout time or total). Open ${nd === 1 ? "it" : "each one"} to delete the extra copy.</div></div>` : "";
  let html = "", lastM = "";
  list.forEach(r => { const m = monthKey(r.date);
    if (m !== lastM){ html += (lastM ? "</div>" : "") + `<div class="mhead">${monthName(m)}</div><div class="list">`; lastM = m; }
    html += rowHTML(r, dups, r.id === SEL_RC); });
  const box = document.getElementById("rcList");
  box.innerHTML = list.length ? html + "</div>" : `<div class="list"><div class="empty">${q ? "No receipts match that search." : "No receipts yet."}</div></div>`;
  wireRows(box);
  if (!RECEIPTS.some(r => r.id === SEL_RC)) SEL_RC = list.length && matchMedia("(min-width: 861px)").matches ? list[0].id : null;
  renderDetail(dups);
}
function renderDetail(dups){
  const el = document.getElementById("rcDetail"), r = RECEIPTS.find(x => x.id === SEL_RC);
  if (!r){ el.innerHTML = '<div class="empty">Select a receipt to see its items.</div>'; document.getElementById("rcWrap").classList.remove("open"); return; }
  const lineSum = sum(r.items), ok = r.printed && Math.abs(lineSum - r.printed_sub) < 0.01, dup = dups[r.id];
  const sus = ok ? new Set() : suspects(r);
  const status = dup ? `<div class="status ${dup.exact ? "err" : "warn"}">${IC.warn}<div><b>${dup.exact ? "This is a copy" : "This may be a copy"}</b> of the ${esc(dup.of.store)} receipt from ${fmt(dup.of.date)}${dup.of.time ? " at " + niceTime(dup.of.time) : ""} (${money(total(dup.of))}). Delete this one to keep your totals right.</div></div>`
    : !r.printed ? "" : ok ? `<div class="status ok">${IC.check}<div>The items match the subtotal on the receipt.</div></div>`
    : `<div class="status warn">${IC.warn}<div><b>The items add up to ${money(lineSum)}, but the receipt says ${money(r.printed_sub)}</b> (${money(Math.abs(lineSum - r.printed_sub))} ${lineSum > r.printed_sub ? "too much" : "missing"}). ${sus.size ? "Lines marked ● look shifted. " : ""}Tap a line to fix it${lineSum < r.printed_sub ? ", or add the missing one" : ""}. It checks again as soon as you save.</div></div>`;
  el.innerHTML = `<button class="btn back" id="rcBack">${IC.back}All receipts</button>
    <div class="dh">${avatar(r.store)}<div><b style="font-size:18px">${esc(r.store)}</b><div class="meta">${fmt(r.date, {weekday:"long", day:"numeric", month:"long", year:"numeric"})}${r.time ? ", " + niceTime(r.time) : ""}</div></div></div>
    <div class="tot num">${money(total(r))}</div>
    <div class="meta">${r.items.length} items${r.ref ? ` · Ref ${esc(r.ref)}` : ""}</div>
    <div style="margin-top:14px">${status}</div>
    <div class="il">${r.items.map(i => EDIT_LINE === i.line_id ? lineForm(i) : `<div class="li" role="button" tabindex="0" data-line="${i.line_id}" title="Tap to fix this line"><span>${sus.has(i.line_id) ? '<i class="sus" title="Looks shifted">●</i>' : ""}${esc(title(String(i.name)))}<small>${esc(i.category)}${i.unit === "kg" ? ` · ${i.qty} kg × ${money(i.unit_price)}/kg` : i.qty !== 1 ? ` · ${i.qty} × ${money(i.unit_price)}` : ""}</small></span><span class="num">${money(i.amount)} <span class="pen">${IC.pencil}</span></span></div>`).join("")}
      ${EDIT_LINE === "new" ? lineForm({}) : `<button class="btn addline" id="rcAddLine">${IC.plus}Add a missing line</button>`}</div>
    <div class="sumr"><span class="muted">Subtotal</span><span class="num">${money(r.subtotal)}</span></div>
    <div class="sumr"><span class="muted">Tax</span><span class="num">${money(r.tax)}</span></div>
    <div class="sumr" style="font-weight:700"><span>Total</span><span class="num">${money(total(r))}</span></div>
    <div style="margin-top:18px">${CONFIRM_DEL
      ? `<div class="confirm show" style="margin-top:0"><span>Delete this receipt and its ${r.items.length + (r.tax ? 1 : 0)} lines? This can’t be undone.</span><span style="flex:1"></span><button class="btn" id="rcNo">Cancel</button><button class="btn primary" id="rcYes" style="background:var(--red-text);border-color:var(--red-text)">Delete</button></div>`
      : `<button class="btn danger" id="rcDel">${IC.trash}Delete receipt</button>`}</div>`;
  el.querySelectorAll(".li[data-line]").forEach(row => { const go = () => { EDIT_LINE = +row.dataset.line; CONFIRM_DEL = false; renderDetail(dups); };
    row.onclick = go; row.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } }; });
  const add = document.getElementById("rcAddLine"); if (add) add.onclick = () => { EDIT_LINE = "new"; renderDetail(dups); };
  const form = el.querySelector(".lineform");
  if (form){
    const f = form.elements, sync = () => {   // weight x price fills in the amount
      const kg = f.unit.value === "kg"; form.querySelector(".lf-q").textContent = kg ? "Weight (kg)" : "Quantity";
      form.querySelector(".lf-p").textContent = kg ? "Price per kg" : "Price each"; };
    f.unit.onchange = sync;
    [f.qty, f.unit_price].forEach(x => x.oninput = () => { const q = +f.qty.value, p = +f.unit_price.value; if (q && p) f.amount.value = (q * p).toFixed(2); });
    form.querySelector(".lf-cancel").onclick = () => { EDIT_LINE = null; renderDetail(dups); };
    const rm = form.querySelector(".lf-del");
    if (rm) rm.onclick = async () => { try { await call("api_delete_line", +form.dataset.id); EDIT_LINE = null; await loadData(); toast("Line removed."); }
      catch (err) { toast("Couldn’t remove: " + (err && err.message || err)); } };
    form.onsubmit = async e => { e.preventDefault();
      const v = {name: f.name.value, unit: f.unit.value, qty: +f.qty.value || 1, unit_price: f.unit_price.value === "" ? null : +f.unit_price.value, amount: +f.amount.value, category: f.category.value};
      try { if (form.dataset.id === "new") await call("api_add_line", r.id, v); else await call("api_update_line", +form.dataset.id, v);
            EDIT_LINE = null; await loadData();
            const nr = RECEIPTS.find(x => x.id === r.id);
            toast(nr && nr.printed && Math.abs(sum(nr.items) - nr.printed_sub) < 0.01 ? "Saved. The items now match the receipt ✓" : "Saved."); }
      catch (err) { toast("Couldn’t save: " + (err && err.message || err)); } };
    f.name.focus();
  }
  document.getElementById("rcBack").onclick = () => { SEL_RC = null; document.getElementById("rcWrap").classList.remove("open"); renderReceipts(); window.scrollTo(0, 0); };
  const del = document.getElementById("rcDel"); if (del) del.onclick = () => { CONFIRM_DEL = true; renderDetail(dups); };
  const no = document.getElementById("rcNo"); if (no) no.onclick = () => { CONFIRM_DEL = false; renderDetail(dups); };
  const yes = document.getElementById("rcYes");
  if (yes) yes.onclick = async () => {
    try { const res = await call("api_delete", [r.id]); SEL_RC = null; CONFIRM_DEL = false;
      document.getElementById("rcWrap").classList.remove("open"); await loadData(); toast(`Deleted (${res.lines} lines).`); }
    catch (err) { toast("Couldn’t delete: " + (err && err.message || err)); }
  };
}
document.getElementById("rcSearch").addEventListener("input", renderReceipts);

// ---------- ONE-TAP BUDGET ----------
function suggestedBudget(){
  const ms = months(), now = new Date().toISOString().slice(0, 7);
  const full = ms.filter(m => m < now);                 // completed months only
  const last = full.length ? full[full.length - 1] : ms[ms.length - 1];
  if (!last) return null;
  const spent = sum(RECEIPTS.filter(r => monthKey(r.date) === last), total);
  return {month: last, spent, amount: Math.max(10, Math.ceil(spent * 1.05 / 10) * 10)};
}
let BUDGET_PROMPT = false;
function openBudget(prompt = false){
  BUDGET_PROMPT = prompt;
  const pop = document.getElementById("budgetPop"), s = suggestedBudget();
  const picks = [150, 250, 400]; if (s && !picks.includes(s.amount)) picks.push(s.amount);
  document.getElementById("bpTitle").textContent = prompt ? "Set a monthly budget?" : "Monthly grocery budget";
  document.getElementById("bpClear").textContent = prompt ? "Not now" : "No budget";
  document.getElementById("bpQuick").innerHTML = picks.sort((a, b) => a - b).map(v =>
    `<button class="btn${v === (BUDGET || (s && s.amount)) ? " primary" : ""}" data-v="${v}">${money0(v)}</button>`).join("");
  document.querySelectorAll("#bpQuick .btn").forEach(b => b.onclick = () => {
    document.getElementById("bpIn").value = b.dataset.v;
    document.querySelectorAll("#bpQuick .btn").forEach(x => x.classList.toggle("primary", x === b)); });
  document.getElementById("bpSuggest").textContent = (prompt ? "Home will show how much is left this month. " : "")
    + (s ? `Suggested ${money0(s.amount)}, a little above ${monthName(s.month)} (${money(s.spent)}).` : "Pick an amount, or type your own.");
  document.getElementById("bpIn").value = BUDGET || (s ? s.amount : "");
  pop.hidden = false;
}
function closeBudget(){
  document.getElementById("budgetPop").hidden = true;
  if (BUDGET_PROMPT && !BUDGET){ PREFS.budget_prompt_dismissed = true;      // ask once; Settings can set it later
    call("api_set_pref", "budget_prompt_dismissed", true).catch(() => {}); }
  BUDGET_PROMPT = false;
}
function maybePromptBudget(){ if (!BUDGET && !PREFS.budget_prompt_dismissed) openBudget(true); }
function current(){ return pageName(); }
async function saveBudget(value){
  BUDGET = Math.max(0, +value || 0);
  try { await call("api_save_budgets", BUDGET, CAT_BUDGETS);
        if (!BUDGET && BUDGET_PROMPT) closeBudget(); else { BUDGET_PROMPT = false; document.getElementById("budgetPop").hidden = true; }
        const n = current(); if (n !== "scan" && n !== "upload") PAGES[n]();
        toast(BUDGET ? `Budget set to ${money0(BUDGET)} a month.` : "No budget set."); }
  catch (err) { toast("Couldn’t save the budget: " + (err && err.message || err)); }
}
document.getElementById("bpSave").addEventListener("click", () => saveBudget(document.getElementById("bpIn").value));
document.getElementById("bpClear").addEventListener("click", () => BUDGET_PROMPT ? closeBudget() : saveBudget(0));
document.getElementById("bpClose").addEventListener("click", closeBudget);
document.getElementById("budgetPop").addEventListener("click", e => { if (e.target.id === "budgetPop") closeBudget(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !document.getElementById("budgetPop").hidden) closeBudget(); });
document.getElementById("bpIn").addEventListener("keydown", e => { if (e.key === "Enter") saveBudget(e.target.value); });

// ---------- SHOPPING PATTERNS ----------
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"], DAY_NAMES = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const BLOCKS = ["Morning","Midday","Afternoon","Evening","Night"], BLOCK_HOURS = ["6–11 am","11 am–2 pm","2–5 pm","5–9 pm","9 pm–6 am"];
const dow = s => (d(s).getDay() + 6) % 7;
function blockOf(t){ if (!t) return null; const h = +t.split(":")[0];
  return h >= 6 && h < 11 ? 0 : h >= 11 && h < 14 ? 1 : h >= 14 && h < 17 ? 2 : h >= 17 && h < 21 ? 3 : 4; }
const avg = a => a.length ? sum(a, x => x) / a.length : 0;
function renderPatterns(){
  const trips = RECEIPTS.map(r => ({date: r.date, time: r.time, total: total(r), day: dow(r.date), block: blockOf(r.time)}));
  const timed = trips.filter(t => t.block !== null);
  if (!trips.length){
    document.getElementById("ptKpis").innerHTML = '<div class="panel empty" style="grid-column:1/-1">No receipts yet. Your patterns appear here as you scan.</div>';
    ["ptHeat","ptInsights","ptDays","ptTimes"].forEach(id => document.getElementById(id).innerHTML = '<div class="empty">Nothing yet.</div>');
    document.getElementById("ptNote").textContent = ""; return; }
  const dayCount = DAYS.map((_, i) => trips.filter(t => t.day === i).length);
  const topDay = dayCount.indexOf(Math.max(...dayCount));
  const hours = timed.map(t => { const [h, m] = t.time.split(":").map(Number); return h + m / 60; }).sort((a, b) => a - b);
  const medH = hours.length ? hours[Math.floor(hours.length / 2)] : null;
  const medT = medH === null ? null : `${String(Math.floor(medH)).padStart(2, "0")}:${String(Math.round((medH % 1) * 60) % 60).padStart(2, "0")}`;
  const usual = medH === null ? null : niceTime(`${String(Math.round(medH) % 24).padStart(2, "0")}:00`).replace(":00", "");
  const g = gapDays(), last = [...trips].sort((a, b) => a.date.localeCompare(b.date)).pop();
  let next = null, overdue = false;
  if (g){ const n = new Date(d(last.date).getTime() + g * 864e5); overdue = n < new Date(new Date().toDateString());
          next = n.toLocaleDateString("en-GB", {weekday: "short", day: "numeric", month: "short"}); }
  document.getElementById("ptKpis").innerHTML =
    kpiCard("Usual day", DAY_NAMES[topDay], "calendar", "#3E7CC2", `${dayCount[topDay]} of ${trips.length} trips`, "plain") +
    kpiCard("Usual time", usual ? `around ${usual}` : "–", "clock", "#B7791F", usual ? `${BLOCKS[blockOf(medT)].toLowerCase()}, ${BLOCK_HOURS[blockOf(medT)]}` : "times appear as you scan", "plain") +
    kpiCard("Between trips", g ? `${g} days` : "–", "receipt", "#2F7A3B", g ? "on average" : "needs 2 trips", "plain") +
    kpiCard("Next trip", next || "–", "cart", "#7A55B5", next ? (overdue ? "you’re due" : "likely, at your pace") : "needs 2 trips", overdue ? "warn" : "plain");

  // heatmap: time block x weekday
  const grid = BLOCKS.map((_, b) => DAYS.map((_, dd) => timed.filter(t => t.block === b && t.day === dd).length));
  const mx = Math.max(1, ...grid.flat());
  let heat = '<div class="heat"><div class="hd"></div>' + DAYS.map(x => `<div class="hd">${x}</div>`).join("");
  grid.forEach((row, b) => { heat += `<div class="lab" title="${BLOCK_HOURS[b]}">${BLOCKS[b]}</div>` + row.map((n, dd) => {
      const a = n ? 0.18 + 0.82 * n / mx : 0;
      return `<div title="${DAY_NAMES[dd]} ${BLOCKS[b].toLowerCase()}: ${n} trip${n === 1 ? "" : "s"}" style="background:${n ? `rgba(47,122,59,${a.toFixed(2)})` : "var(--surface-2)"};color:${a > .55 ? "#fff" : "var(--muted)"}">${n || ""}</div>`; }).join(""); });
  document.getElementById("ptHeat").innerHTML = timed.length ? heat + "</div>"
    : '<div class="empty">Checkout times are read from each new receipt. Scan a receipt to start filling this in.</div>';

  // average basket by weekday and by time of day
  const byDay = DAYS.map((x, i) => ({label: x, value: avg(trips.filter(t => t.day === i).map(t => t.total))})).filter(x => x.value);
  document.getElementById("ptDays").innerHTML = barsSVG(byDay, {h: 200});
  const byBlock = BLOCKS.map((x, b) => ({label: x, value: avg(timed.filter(t => t.block === b).map(t => t.total))})).filter(x => x.value);
  document.getElementById("ptTimes").innerHTML = byBlock.length ? barsSVG(byBlock, {h: 200}) : '<div class="empty">Appears once receipts with times are scanned.</div>';

  // plain-language insights
  const ins = [];
  ins.push(["#3E7CC2", "calendar", `You shop most on ${DAY_NAMES[topDay]}s`, usual ? `usually around ${usual}` : `${dayCount[topDay]} of your ${trips.length} trips`]);
  const wk = trips.filter(t => t.day < 5).map(t => t.total), we = trips.filter(t => t.day >= 5).map(t => t.total);
  if (wk.length && we.length){ const a = avg(wk), b = avg(we), hi = b > a;
    ins.push(["#B7791F", "basket", `${hi ? "Weekend" : "Weekday"} trips cost ${Math.round(Math.abs(b - a) / Math.min(a, b) * 100)}% more`, `${money(b)} on weekends vs ${money(a)} on weekdays`]); }
  const day = timed.filter(t => t.block <= 2).map(t => t.total), eve = timed.filter(t => t.block >= 3).map(t => t.total);
  if (day.length && eve.length){ const a = avg(day), b = avg(eve);
    ins.push(["#7A55B5", "clock", `${b > a ? "Evening" : "Daytime"} baskets are bigger`, `${money(b)} after 5 pm vs ${money(a)} earlier`]); }
  if (next) ins.push(["#2F7A3B", "cart", overdue ? "You’re probably due for a shop" : `Next shop likely around ${next}`, `you shop about every ${g} days`]);
  document.getElementById("ptInsights").innerHTML = ins.map(([c, i, b, s]) =>
    `<div class="ins"><div class="ic" style="background:${c}">${IC[i]}</div><div><b>${esc(b)}</b><span class="muted">${esc(s)}</span></div></div>`).join("");
  const untimed = trips.length - timed.length;
  const notes = [];
  if (trips.length < 8) notes.push(`Early days: these patterns come from ${trips.length} trip${trips.length === 1 ? "" : "s"} and will firm up as you scan more.`);
  if (untimed) notes.push(`${untimed} receipt${untimed === 1 ? " was" : "s were"} scanned before checkout times were saved, so ${untimed === 1 ? "it counts" : "they count"} for days but not times of day.`);
  document.getElementById("ptNote").textContent = notes.join(" ");
}

// ---------- navigation ----------
const PAGES = {home:renderHome, scan:() => {}, upload:() => {}, receipts:renderReceipts, settings:renderSettings,
               overview:renderOverview, patterns:renderPatterns, reports:renderReports, pantry:renderPantry};
const MORE = new Set(["overview", "patterns", "reports", "pantry"]);   // shown only with "Show more pages"
function pageName(){
  let n = location.hash.slice(1);
  if (n === "analytics") n = "overview";          // Spend Analytics is now part of the Dashboard
  return PAGES[n] && (!MORE.has(n) || PREFS.show_advanced) ? n : "home";
}
function applyPrefs(){ document.getElementById("navMore").hidden = !PREFS.show_advanced; }
const side = document.getElementById("side"), menuBtn = document.getElementById("menuBtn");
function show(){
  const name = pageName();
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("on", p.id === "p-" + name));
  const nav = name === "upload" ? "scan" : name;
  document.querySelectorAll(".nav a, .tabbar a").forEach(a => a.dataset.page === nav ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
  if (name !== "receipts") document.getElementById("rcWrap").classList.remove("open");
  PAGES[name]();
  window.scrollTo(0, 0);
}
let toastT; function toast(msg){ const t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 3200); }
async function loadData(){
  const d = await call("api_data");
  RECEIPTS = d.receipts || []; BUDGET = d.budget || 0; STORAGE = d.storage || ""; CAT_BUDGETS = d.cat_budgets || {...DEFAULT_CAT_BUDGETS};
  PREFS = d.prefs || {}; applyPrefs();
  const name = pageName();
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