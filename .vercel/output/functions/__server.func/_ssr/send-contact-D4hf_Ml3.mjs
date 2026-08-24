import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { t as EMAIL } from "./site-kQ5QAUhw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-contact-D4hf_Ml3.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SERVICES = {
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
	const serviceLabel = SERVICES[data.service] ?? data.service;
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
var sendContact_createServerFn_handler = createServerRpc({
	id: "3e587c1109a072e229695c96c1580ae6781adecb483cd6de4b99d2b622afcbdd",
	name: "sendContact",
	filename: "src/lib/send-contact.ts"
}, (opts) => sendContact.__executeServer(opts));
var sendContact = createServerFn({ method: "POST" }).validator((input) => input).handler(sendContact_createServerFn_handler, async ({ data }) => {
	const prepared = validate(data);
	if (!prepared.ok) return prepared;
	if (!("payload" in prepared)) return { ok: true };
	return postToFormSubmit(prepared.payload);
});
//#endregion
export { sendContact_createServerFn_handler };
