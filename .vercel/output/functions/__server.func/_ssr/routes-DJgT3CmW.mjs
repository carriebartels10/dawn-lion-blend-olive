import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as require_jsx_runtime, n as Slot, t as Root } from "../_libs/@radix-ui/react-label+[...].mjs";
import { a as Store, c as Menu, d as LoaderCircle, f as House, h as ArrowRight, i as Sunrise, l as MapPinned, m as Check, n as Wheat, o as ShieldCheck, p as ExternalLink, s as PawPrint, t as X, u as Mail } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as requestService, i as TOWNS, n as FACEBOOK_URL, r as MAILTO, t as EMAIL } from "./site-kQ5QAUhw.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DJgT3CmW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-display text-sm font-semibold tracking-wide uppercase transition-[transform,background-color,color,border-color,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-green text-paper hover:bg-green-dark",
			blue: "bg-blue text-paper hover:bg-blue-dark",
			paper: "bg-paper text-ink hover:bg-mist",
			outline: "border border-paper/50 bg-transparent text-paper hover:border-paper hover:bg-paper/10",
			ghost: "bg-transparent text-ink hover:bg-mist",
			ink: "border border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper"
		},
		size: {
			default: "h-11 rounded-md px-5",
			sm: "h-9 rounded-sm px-3.5 text-xs",
			lg: "h-12 rounded-md px-7",
			icon: "size-11 rounded-md"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-line bg-paper px-3.5 text-base text-ink shadow-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-base text-ink shadow-none transition-[border-color,box-shadow] duration-[var(--motion-quick)] placeholder:text-muted", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", "disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SERVICES$1 = {
	agriculture: "Agriculture",
	residential: "Residential / inspection",
	rescue: "Lost pet search",
	sales: "Buy a drone",
	other: "Something else"
};
var SEND_ERROR = "Could not send right now. Message us on Facebook or email aerialalliesllc@gmail.com.";
function validate(data) {
	if (data.honey.trim()) return { ok: true };
	const name = data.name.trim();
	const email = data.email.trim();
	const phone = data.phone.trim();
	const location = data.location.trim();
	const pet = data.pet.trim();
	const message = data.message.trim();
	if (!name || !message) return {
		ok: false,
		error: "Name and a short note are required."
	};
	if (!email && !phone) return {
		ok: false,
		error: "Leave an email or a phone number so we can reach you."
	};
	const serviceLabel = SERVICES$1[data.service] ?? data.service;
	const subject = data.service === "rescue" ? `Lost pet — ${pet || name} — Aerial Allies` : data.service === "sales" ? `Drone purchase — ${name} — Aerial Allies` : `Flight request — ${serviceLabel} — Aerial Allies`;
	const payload = {
		name,
		email: email || "(no email)",
		phone: phone || "(no phone)",
		location: location || "(not given)",
		need: serviceLabel,
		message,
		_subject: subject,
		_template: "table",
		_captcha: "false"
	};
	if (pet) payload.pet = pet;
	if (email) payload._replyto = email;
	return {
		ok: true,
		payload
	};
}
async function postToFormSubmit(payload) {
	const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload),
		signal: AbortSignal.timeout(15e3)
	});
	const body = await res.json().catch(() => null);
	if (!(/confirm|activat/i.test(body?.message ?? "") || res.ok && (body == null || body.success === true || body.success === "true" || /sent|success|thank/i.test(body.message ?? "")))) return {
		ok: false,
		error: SEND_ERROR
	};
	return { ok: true };
}
var sendContact = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3e587c1109a072e229695c96c1580ae6781adecb483cd6de4b99d2b622afcbdd"));
async function deliverContact(data) {
	const prepared = validate(data);
	if (!prepared.ok) return prepared;
	if (!("payload" in prepared)) return { ok: true };
	try {
		const direct = await postToFormSubmit(prepared.payload);
		if (direct.ok) return direct;
	} catch {}
	try {
		return await sendContact({ data });
	} catch {
		return {
			ok: false,
			error: SEND_ERROR
		};
	}
}
var SERVICES = [
	{
		value: "agriculture",
		label: "Agriculture"
	},
	{
		value: "residential",
		label: "Residential / inspection"
	},
	{
		value: "rescue",
		label: "Lost pet search"
	},
	{
		value: "sales",
		label: "Buy a drone"
	},
	{
		value: "other",
		label: "Something else"
	}
];
function ContactForm() {
	const [service, setService] = (0, import_react.useState)("agriculture");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onService = (event) => {
			const next = event.detail;
			if (next) setService(next);
		};
		window.addEventListener("aa:service", onService);
		return () => window.removeEventListener("aa:service", onService);
	}, []);
	async function onSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = String(data.get("name") || "").trim();
		const email = String(data.get("email") || "").trim();
		const phone = String(data.get("phone") || "").trim();
		const location = String(data.get("location") || "").trim();
		const message = String(data.get("message") || "").trim();
		const pet = String(data.get("pet") || "").trim();
		const honey = String(data.get("company") || "");
		if (!name || !message) {
			setError("Name and a short note are required.");
			return;
		}
		if (!email && !phone) {
			setError("Leave an email or a phone number so we can reach you.");
			return;
		}
		setError("");
		setSending(true);
		try {
			const result = await deliverContact({
				name,
				email,
				phone,
				location,
				service,
				pet,
				message,
				honey
			});
			if (!result.ok) {
				setError(result.error);
				return;
			}
			setSent(true);
		} catch {
			setError(`Could not send right now. Message us on Facebook or email ${EMAIL}.`);
		} finally {
			setSending(false);
		}
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-line bg-paper p-6 sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex size-11 items-center justify-center rounded-md bg-green text-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					className: "size-5",
					strokeWidth: 2.2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-semibold uppercase tracking-wide text-ink",
				children: "We have your note"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 max-w-prose text-ink/80",
				children: [
					"Your request was sent to ",
					EMAIL,
					". We will get back to you. Facebook is still the fastest line after dark, especially for a lost pet."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: FACEBOOK_URL,
						target: "_blank",
						rel: "noreferrer",
						children: ["Message on Facebook", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ink",
					type: "button",
					onClick: () => setSent(false),
					children: "Send another"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "rounded-xl border border-line bg-paper p-5 sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sr-only",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Company", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				name: "company",
				tabIndex: -1,
				autoComplete: "off"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.16em] text-ink",
					children: "What do you need?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2 sm:grid-cols-2",
					children: SERVICES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-3.5 text-sm transition-[border-color,background-color] duration-[var(--motion-quick)]", service === item.value ? "border-ink bg-ink text-paper" : "border-line bg-mist text-ink hover:border-ink/40"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "service",
							value: item.value,
							checked: service === item.value,
							onChange: () => setService(item.value),
							className: "sr-only"
						}), item.label]
					}, item.value))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-5 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "name",
							label: "Name",
							required: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								name: "name",
								autoComplete: "name",
								required: true,
								disabled: sending
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "phone",
							label: "Phone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "phone",
								name: "phone",
								type: "tel",
								autoComplete: "tel",
								disabled: sending
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "email",
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								name: "email",
								type: "email",
								autoComplete: "email",
								disabled: sending
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "location",
							label: "Town or section",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "location",
								name: "location",
								placeholder: "Hallam, Lincoln, Beatrice…",
								disabled: sending
							})
						})
					]
				}),
				service === "rescue" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "pet",
					label: "Pet name and description",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pet",
						name: "pet",
						placeholder: "Name, color, breed, collar",
						disabled: sending
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "message",
					label: service === "rescue" ? "Last seen and what happened" : service === "sales" ? "Which drone and what for" : "Tell us about the job",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "message",
						name: "message",
						required: true,
						disabled: sending,
						placeholder: service === "rescue" ? "When they went missing, last known spot, terrain — corn, timber, creek, highway…" : service === "sales" ? "Matrice 4T, J70, or J150 — what you want to fly and when you need it." : "Crop, roof, listing photos, storm damage — whatever you need from the air."
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-danger",
					role: "alert",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						disabled: sending,
						children: sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), "Sending…"] }) : "Send request"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ink",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: FACEBOOK_URL,
							target: "_blank",
							rel: "noreferrer",
							children: ["Facebook", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"This form emails ",
						EMAIL,
						" directly. We fly when weather and airspace allow. Lost-pet searches come first."
					]
				})
			]
		})]
	});
}
function Field({ id, label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
			htmlFor: id,
			children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-1 text-green",
				children: "*"
			}) : null]
		}), children]
	});
}
function Logo({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "#top",
		className: cn("group inline-flex items-center gap-2.5 no-underline", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/images/logo-mark.png",
			alt: "",
			className: cn("w-auto object-contain", compact ? "h-11 sm:h-12" : "h-14"),
			width: 748,
			height: 498
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-[0.92rem] font-bold uppercase tracking-[0.12em] text-ink sm:text-[1.02rem]",
				children: "Aerial Allies"
			}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 hidden font-display text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-blue sm:block",
				children: "LLC"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 hidden font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-green sm:block",
				children: "Drone services"
			})]
		})]
	});
}
function LogoLockup({ className, alt = "Aerial Allies LLC — agriculture, residential and pet rescue drone services" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/images/logo.png",
		alt,
		className: cn("h-auto w-full object-contain", className),
		width: 900,
		height: 820
	});
}
var LINKS = [
	{
		href: "#services",
		label: "Services"
	},
	{
		href: "#shop",
		label: "For sale"
	},
	{
		href: "#story",
		label: "Bella"
	},
	{
		href: "#area",
		label: "Service area"
	},
	{
		href: "#contact",
		label: "Contact"
	}
];
function SiteHeader() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 bg-paper text-ink transition-[box-shadow] duration-[var(--motion-fast)] ease-[var(--ease-out)]", scrolled || open ? "shadow-[0_10px_32px_-18px_rgba(54,58,60,0.45)]" : "shadow-none"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-full bg-[linear-gradient(90deg,var(--color-green)_0%,var(--color-green)_42%,var(--color-blue)_42%,var(--color-blue)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.75rem] sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { compact: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-7 lg:flex",
						"aria-label": "Primary",
						children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: link.href,
							className: "font-display text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink/70 transition-colors duration-[var(--motion-quick)] hover:text-green",
							children: link.label
						}, link.href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "blue",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								onClick: () => requestService("rescue"),
								children: "Lost pet"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								children: "Request a flight"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						"aria-label": open ? "Close menu" : "Open menu",
						"aria-expanded": open,
						onClick: () => setOpen((value) => !value),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("border-t border-line bg-paper lg:hidden", open ? "block" : "hidden"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex min-h-[calc(100dvh-4.75rem)] flex-col gap-1 px-4 py-6",
					"aria-label": "Mobile",
					children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink",
						children: link.label
					}, link.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-2 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "blue",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								onClick: () => {
									requestService("rescue");
									setOpen(false);
								},
								children: "Lost pet"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#contact",
								onClick: () => setOpen(false),
								children: "Request a flight"
							})
						})]
					})]
				})
			})
		]
	});
}
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "top",
		className: "bg-mist text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Story, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagBand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowWeFly, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frankie, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceArea, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate flex min-h-dvh items-end overflow-hidden bg-ink-deep pt-[4.75rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/hero.jpg?v=fleet3",
				alt: "DJI Matrice 4T flying over southeast Nebraska cornfields at golden hour",
				className: "absolute inset-0 size-full object-cover",
				width: 1920,
				height: 1080,
				fetchPriority: "high"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[linear-gradient(180deg,rgba(31,36,38,0.28)_0%,rgba(31,36,38,0.12)_36%,rgba(31,36,38,0.82)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto grid w-full max-w-6xl gap-8 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,280px)_1fr] lg:items-end lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "stagger-in hidden max-w-[280px] rounded-xl bg-paper p-4 shadow-[0_24px_50px_-28px_rgba(31,36,38,0.65)] sm:p-5 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger-in max-w-xl pb-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-paper/80",
							children: "Agriculture · Residential · Pet Rescue"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-bold uppercase leading-[0.95] tracking-[0.04em] text-paper",
							children: "Neighbors in the air."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg text-lg text-paper/90 sm:text-xl",
							children: "Drone service across Southeast Nebraska. We fly for farms, homesteads, and lost pets."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									children: ["Request a flight", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#story",
									children: "Read Bella’s story"
								})
							})]
						})
					]
				})]
			})
		]
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "scroll-mt-24 bg-mist py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
						children: "What we fly"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
						children: "Three jobs. One drone in the air."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-ink/80",
						children: "Same crew, same country roads. Whether it is a quarter-section of beans, a metal roof after hail, or a dog in the corn, we take off from near Hallam and cover Southeast Nebraska."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "agriculture",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "green",
						eyebrow: "Agriculture",
						title: "See the whole field",
						image: "/images/ag.jpg?v=fleet3",
						alt: "DJI Agras T100 agricultural spray drone over Nebraska crop rows",
						service: "agriculture",
						body: "From the cab you see a row. From a few hundred feet you see the stand, the wet corner, and the trouble you would miss until harvest. Crop scouting, field maps, and aerial views of corn, beans, and pasture."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "residential",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "ink",
						eyebrow: "Residential",
						title: "Roofs, listings, storm",
						image: "/images/residential.jpg?v=fleet3",
						alt: "DJI Matrice 4T inspecting a Nebraska farmhouse and barn",
						service: "residential",
						body: "Roof and outbuilding inspections without a ladder. Storm-damage photos for insurance. Listing pictures that show the house, the bins, the timber, and the road in — the way a buyer actually looks at an acreage."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "rescue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PawPrint, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "blue",
						eyebrow: "Pet rescue",
						title: "When a dog runs a section",
						image: "/images/rescue.jpg?v=fleet3",
						alt: "DJI Matrice 4T flying low over a Nebraska cornfield at dusk",
						service: "rescue",
						body: "Clock is running. We put a camera over fence lines, draws, and crop and pin what we see. Bella was our first official find — missing near Hallam, spotted from the air, home the same night."
					})
				]
			})]
		})
	});
}
function ServiceCard({ id, icon, eyebrow, title, image, alt, body, service, tone, cta = "Book this flight", imageClass }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id,
		className: "flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-line bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative aspect-[4/3] overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt,
				className: cn("size-full object-cover", imageClass),
				width: 1400,
				height: 1050,
				loading: "lazy"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-6 sm:p-7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-2", tone === "green" && "text-green", tone === "blue" && "text-blue", tone === "ink" && "text-ink"),
					children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
						children: eyebrow
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-display text-xl font-bold uppercase tracking-wide text-ink",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 flex-1 text-[1.02rem] leading-relaxed text-ink/80",
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#contact",
					onClick: () => requestService(service),
					className: "mt-5 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-green",
					children: [cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
				})
			]
		})]
	});
}
function Story() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "story",
		className: "scroll-mt-24 bg-blue text-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-[3/4] lg:aspect-auto lg:min-h-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/bella.jpg?v=fb",
					alt: "Bella, a merle Mini Aussie, sitting in the passenger seat of a pickup after Aerial Allies found her near Hallam",
					className: "absolute inset-0 size-full object-cover object-center",
					width: 1536,
					height: 2048,
					loading: "lazy"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-16 sm:px-10 sm:py-20 lg:px-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-paper/65",
						children: "First official search"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em]",
						children: "Bella came home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-lg italic leading-relaxed text-paper/92",
						children: "“If it’s not a sign from God that we found our purpose in our business, I don’t know what would be.”"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4 text-[1.05rem] leading-relaxed text-paper/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Bella went missing close to Hallam. We saw the post on the Lincoln lost-and-found pets page from our back porch and said we’d keep an eye out. Five minutes later she walked around the corner of the shop — then bolted into the corn and beans." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That is when we deployed the drone. We spotted her and pinned her before weather grounded us. We drove the section. A half mile from where we last saw her, she was on the side of the road. We sat down in the middle of it. Miss Bella jumped in the truck." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Home the same night. That is why we fly." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "paper",
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							onClick: () => requestService("rescue"),
							children: "Report a lost pet"
						})
					})
				]
			})]
		})
	});
}
function FlagBand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden bg-ink-deep",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/images/flag.jpg?v=fleet3",
				alt: "American flag flying from a DJI Matrice 4T over Nebraska farmland",
				className: "absolute inset-0 size-full object-cover object-center",
				width: 1600,
				height: 900,
				loading: "lazy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-ink/55" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-[280px] max-w-6xl flex-col justify-end px-4 py-16 sm:min-h-[340px] sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-paper/70",
					children: "Soaring with the Stars & Stripes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 max-w-xl font-display text-2xl font-bold uppercase tracking-[0.04em] text-paper",
					children: "Proud to fly it over Nebraska ground."
				})]
			})
		]
	});
}
function HowWeFly() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-mist py-20 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
						children: "How a flight works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
						children: "No runaround. Just airtime."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-prose text-lg text-ink/80",
						children: "We are a working rural crew, not a call center. Message us the same way you would a neighbor — email or Facebook."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 overflow-hidden rounded-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/shop.jpg?v=outdoor",
							alt: "DJI Matrice 4T and RC Plus controller staged on a pickup tailgate in a Nebraska farmyard",
							className: "aspect-[4/3] w-full object-cover",
							width: 1400,
							height: 1050,
							loading: "lazy"
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-4",
					children: [
						{
							n: "01",
							title: "Tell us the job",
							body: "Field, roof, listing, or a missing pet. Town or section, what you need, and when."
						},
						{
							n: "02",
							title: "We check the sky",
							body: "Weather, airspace, and a safe place to take off. We fly neighborly — not over a crowd, not through a storm."
						},
						{
							n: "03",
							title: "You get the view",
							body: "Photos, video, or a pin on the map. For a lost pet, we stay on it until weather or light says otherwise."
						}
					].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-line bg-paper p-6 sm:p-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold tracking-[0.2em] text-green",
								children: step.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-xl font-bold uppercase tracking-wide text-ink",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-ink/80",
								children: step.body
							})
						]
					}, step.n))
				})]
			})
		})
	});
}
function Frankie() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "bg-paper py-20 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "order-first overflow-hidden rounded-xl lg:order-last",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/images/frankie-j70.jpg?v=fb",
					alt: "Frankie, Aerial Allies’ Bernese Mountain Dog, sitting in front of an EAVision J70 spray drone",
					className: "aspect-[3/4] w-full object-cover object-center",
					width: 1200,
					height: 1600,
					loading: "lazy"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
					children: "The J70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
					children: "Frankie, for scale."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-prose text-lg text-ink/80",
					children: "Our Bernese sitting in front of the EAVision J70 — the compact spray drone for smaller fields, fencerows, and family farms. When the job does not need the J150, this is the drone we roll out."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							onClick: () => requestService("agriculture"),
							children: "Book a spray flight"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#contact",
							onClick: () => requestService("sales"),
							children: "Ask about buying a J70"
						})
					})]
				})
			] })]
		})
	});
}
function Shop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "shop",
		className: "scroll-mt-24 bg-mist py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
						children: "For sale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
						children: "The drones we fly — and sell."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-ink/80",
						children: "DJI Matrice 4T. EAVision J70 and J150. Same machines we take off from Hallam. Ask us about buying one for your own farm, roof work, or search."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-6 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "matrice-4t",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "ink",
						eyebrow: "DJI",
						title: "Matrice 4T",
						image: "/images/shop.jpg?v=outdoor",
						alt: "DJI Matrice 4T and RC Plus controller staged on a pickup tailgate",
						service: "sales",
						cta: "Ask about buying",
						body: "The camera and thermal drone we fly for roofs, listings, and lost pets. A working aircraft, not a toy."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "j70",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "green",
						eyebrow: "EAVision",
						title: "J70",
						image: "/images/frankie-j70.jpg?v=fb",
						alt: "Frankie sitting in front of an EAVision J70 spray drone",
						service: "sales",
						cta: "Ask about buying",
						imageClass: "object-top",
						body: "Compact spray drone for smaller fields, fencerows, and family farms. The one Frankie is sitting in front of."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						id: "j150",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
							className: "size-5",
							strokeWidth: 1.75
						}),
						tone: "green",
						eyebrow: "EAVision",
						title: "J150",
						image: "/images/j150.jpg?v=sale",
						alt: "EAVision J150 agricultural spray drone over crop rows",
						service: "sales",
						cta: "Ask about buying",
						body: "The larger spray drone for bigger jobs. When the field needs more tank than the J70, this is the one."
					})
				]
			})]
		})
	});
}
function ServiceArea() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "area",
		className: "scroll-mt-24 border-y border-line bg-paper py-20 sm:py-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
						children: "Southeast Nebraska"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
						children: "Based near Hallam. Flying the country around it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-prose text-lg text-ink/80",
						children: "Lincoln to Beatrice, Crete to the county line, and the gravel in between. If you are on the edge of our map, still ask — a lost pet does not care about a radius."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-8 grid gap-3 text-ink/85",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, { className: "mt-0.5 size-4 shrink-0 text-green" }), "Shop and home base near Hallam, Lancaster County"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sunrise, { className: "mt-0.5 size-4 shrink-0 text-green" }), "Daylight flights; weather calls the rest"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-green" }), "Legal, low, and neighborly — we do not buzz houses for sport"]
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted",
					children: "Towns we regularly fly"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 flex flex-wrap gap-2",
					children: TOWNS.map((town) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-md border border-line bg-mist px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-ink",
						children: town
					}, town))
				})] })]
			})
		})
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "scroll-mt-24 bg-mist py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs font-semibold uppercase tracking-[0.22em] text-green",
					children: "Get us in the air"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-2xl font-bold uppercase tracking-[0.04em] text-ink",
					children: "Request a flight, report a lost pet, or buy a drone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 max-w-prose text-lg text-ink/80",
					children: [
						"Fill this out and it goes straight to ",
						EMAIL,
						". We sell the DJI Matrice 4T and the EAVision J70 and J150. Facebook is still the quickest line after dark when a dog is still out."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: MAILTO,
					className: "mt-8 flex items-center gap-3 rounded-xl border border-line bg-paper p-4 pr-5 text-ink transition-colors duration-[var(--motion-quick)] hover:border-green",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-md bg-green text-paper",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "size-5",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-sm font-semibold uppercase tracking-[0.12em]",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm text-muted normal-case tracking-normal",
						children: EMAIL
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: FACEBOOK_URL,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-3 inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 pr-5 text-ink transition-colors duration-[var(--motion-quick)] hover:border-green",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/logo-mark.png",
						alt: "",
						className: "size-11 rounded-md object-contain",
						width: 748,
						height: 498
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-sm font-semibold uppercase tracking-[0.12em]",
						children: "Aerial Allies on Facebook"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-0.5 flex items-center gap-1 text-sm text-muted",
						children: ["Message the page", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
					})] })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {})]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-ink text-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-[240px] rounded-xl bg-paper p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoLockup, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 font-display text-xs font-semibold uppercase tracking-[0.16em] text-paper/70",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#services",
						className: "hover:text-paper",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#shop",
						className: "hover:text-paper",
						children: "For sale"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#story",
						className: "hover:text-paper",
						children: "Bella’s story"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: MAILTO,
						className: "normal-case tracking-normal hover:text-paper",
						children: EMAIL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: FACEBOOK_URL,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:text-paper",
						children: "Facebook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#contact",
						className: "hover:text-paper",
						children: "Contact"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-paper/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 py-4 font-display text-[0.65rem] uppercase tracking-[0.16em] text-paper/45 sm:px-6",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Aerial Allies LLC · aerialallies.com"
				]
			})
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, {});
}
//#endregion
export { Home as component };
