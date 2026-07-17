import { a as __toESM } from "../_runtime.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { M as require_react, h as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Instagram, c as ChevronDown, i as Lock, l as ArrowUp, n as Menu, o as Download, r as Mail, s as Cloud, t as Search, u as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CnStkljG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-black text-white text-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2 sm:px-6 lg:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "mailto:support@visune.io",
					"aria-label": "Email",
					className: "opacity-80 hover:opacity-100 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "https://instagram.com/visune",
					"aria-label": "Instagram",
					className: "opacity-80 hover:opacity-100 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "flex items-center gap-1 opacity-90 hover:opacity-100 transition",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Country/region" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "United States (USD $)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })
				]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: `sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(0,0,0,0.06)]" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "text-2xl font-bold tracking-tight text-black lowercase",
					children: "visune"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							label: "Resources",
							hasCaret: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { label: "Pricing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { label: "Companion App" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, { label: "Tutorials" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Search",
							className: "rounded-full p-2 hover:bg-neutral-100 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#login",
							className: "hidden rounded-full border border-neutral-300 px-5 py-2 text-sm font-medium text-black hover:bg-neutral-50 transition md:inline-block",
							children: "Log in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#signup",
							className: "hidden rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition md:inline-block",
							children: "Sign up"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Open menu",
							className: "rounded-full p-2 hover:bg-neutral-100 transition md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		})
	})] });
}
function NavLink({ label, hasCaret }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "#",
		className: "flex items-center gap-1 text-sm font-medium text-neutral-900 hover:text-black transition",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), hasCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3" })]
	});
}
function BackToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setVisible(window.scrollY > 800);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	if (!visible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		initial: {
			opacity: 0,
			y: 12
		},
		animate: {
			opacity: 1,
			y: 0
		},
		onClick: () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}),
		className: "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg hover:bg-neutral-800 transition",
		"aria-label": "Back to top",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" })
	});
}
var CDN = "https://visune.io/cdn/shop/files";
var brandLogos = [
	{
		name: "Google",
		src: `${CDN}/Google_15cf49cb-7381-407d-a99d-a7b9a431209b.png?v=1773394355&width=400`
	},
	{
		name: "Logitech",
		src: `${CDN}/Logitech_b9b8ec09-ed24-4d6f-9ad5-cb86186bdf43.png?v=1773394358&width=400`
	},
	{
		name: "On",
		src: `${CDN}/On_d47aad6e-c578-44c0-a224-dfce2639b95d.png?v=1773394360&width=400`
	},
	{
		name: "Sonos",
		src: `${CDN}/Sonos_5bbd54c9-8f71-4c22-b967-6129930370c7.png?v=1773394362&width=400`
	},
	{
		name: "P&G",
		src: `${CDN}/P_G_c865cc63-98b1-4cf3-8d9f-da0e3f8e1295.png?v=1773394370&width=400`
	},
	{
		name: "SharkNinja",
		src: `${CDN}/SharkNinja_d3dcb9ae-c6be-40c5-9c7f-e6eedd2d106d.png?v=1773394375&width=400`
	},
	{
		name: "Spectrum",
		src: `${CDN}/Spectrum_023cdd95-2c90-494b-81ee-c2e461da78b6.png?v=1773394377&width=400`
	},
	{
		name: "Huawei",
		src: `${CDN}/Huawei_68140e41-2885-4289-aec2-0fb4a0a20afc.png?v=1773394381&width=400`
	}
];
var bringToLifeCards = [
	{
		title: "Studios",
		body: "Save time and visualise your product in our studio scenes. Made by designers who specialise in visualisation.",
		cta: "Shop studios",
		img: `${CDN}/Visune_-_Packshot_Reference_Studio_STU165__Detail_with_Physical_Lights.jpg?v=1779865356&width=800`
	},
	{
		title: "Interiors",
		body: "View your products in situ with our custom-made interior scenes. We did the hard work so you don't have to.",
		cta: "Shop interiors",
		img: `${CDN}/Visune_-_Soft_Light_Diorama_INT099__Promo_1.jpg?v=1779865262&width=800`
	},
	{
		title: "Materials",
		body: "Dress your products and scenes with our photo-realistic material packages, constructed using 4K textures.",
		cta: "Shop materials",
		img: `${CDN}/Ceramic_025_Jade_Oxide_Glaze_Sphere_0aede22d-22b2-4612-a213-c75f5b2a37b7.jpg?v=1779872153&width=800`
	},
	{
		title: "Models",
		body: "Complete your scenes with furnishings, products and decorative items, all ready to drag and drop into your scenes.",
		cta: "Shop Models",
		img: `${CDN}/Visune_-_Loft_Diorama_INT152__Objects_Thumbnail_Promo_3ac8398f-0aab-47f4-a7d0-0ab4ff488315.jpg?v=1775753152&width=800`
	}
];
var featured = [
	{
		title: "Ledge Studio (Gen2)",
		tag: "New Arrival",
		price: "30",
		img: `${CDN}/Visune-LedgeStudio_Gen2_STU172__Concrete_Left.jpg?v=1782724989&width=800`
	},
	{
		title: "Window Sill Diorama (Gen2)",
		tag: "New Arrival",
		price: "30",
		img: `${CDN}/Visune-WindowSillDiorama_INT172__FoliageMask_Main.jpg?v=1782378446&width=800`
	},
	{
		title: "Material Fade Reference Studio",
		tag: "New Arrival",
		price: "50",
		img: `${CDN}/Ceramic_025_Jade_Oxide_Glaze_Sphere_0aede22d-22b2-4612-a213-c75f5b2a37b7.jpg?v=1779872153&width=800`
	},
	{
		title: "Industrial Design Material Collection 2026",
		price: "100",
		oldPrice: "240",
		img: `${CDN}/Visune-IDMaterialCollectionThumbnailV4.jpg?v=1779713921&width=800`
	},
	{
		title: "Premium Material Collection",
		price: "150",
		oldPrice: "190",
		img: `${CDN}/VisuneXGilbertoCeriani-PremiumMaterialPack_MAT054_Thumbnail.jpg?v=1759927641&width=800`
	},
	{
		title: "Furniture Design Material Collection 2026",
		price: "100",
		oldPrice: "250",
		img: `${CDN}/Visune-FDMaterialCollectionThumbnailV4.jpg?v=1779713915&width=800`
	},
	{
		title: "Still Life Studio",
		price: "35",
		img: `${CDN}/Visune-StillLifeStudio_STU156__Straight.jpg?v=1770116243&width=800`
	},
	{
		title: "Østerbro Townhouse",
		price: "80",
		img: `${CDN}/Visune-FlagshipInterior_INT151__Straight_3b4012e7-12d4-4c00-9b0d-9d43a0dedd49.jpg?v=1768826021&width=800`
	},
	{
		title: "Floating Product Studio (Gen2)",
		price: "25",
		img: `${CDN}/Visune-FloatingProductStudio_Gen2_STU132__SolidBackdrop_LightingVariant4-Silhouette_e45b41ee-c06c-4015-be20-9d0a5bcf2a22.jpg?v=1751987697&width=800`
	},
	{
		title: "Dining Room Diorama 2",
		tag: "New Arrival",
		price: "30",
		img: `${CDN}/Visune-DiningRoomDiorama2_INT168__Sunny_Main_8aa5e545-fc0e-4825-ba6f-b4d2bd4178d5.jpg?v=1780578747&width=800`
	},
	{
		title: "Hand Elements",
		price: "70",
		img: `${CDN}/Visune_HandElementsThumbnail.jpg?v=1746085032&width=800`
	},
	{
		title: "Contemporary Living",
		tag: "Subscription exclusive",
		price: "80",
		img: `${CDN}/Visune-ContemporaryLiving_INT144__Sunny_Lounge.jpg?v=1762419272&width=800`
	}
];
var goto = [
	{
		cat: "Studios",
		brand: "Visune",
		title: "Packshot Reference Studio",
		price: "50",
		img: `${CDN}/Visune-PackshotReferenceStudio_STU165__34withPhysicalLights_f0586f6a-52a3-4871-ae87-65d7a4d7fd00.jpg?v=1776082290&width=800`
	},
	{
		cat: "Materials",
		brand: "Gilberto Ceriani",
		title: "Premium Material Collection",
		price: "150",
		img: `${CDN}/VisuneXGilbertoCeriani-PremiumMaterialPack_MAT054_Thumbnail.jpg?v=1759927641&width=800`
	},
	{
		cat: "Interiors",
		brand: "Visune",
		title: "Østerbro Townhouse",
		price: "80",
		img: `${CDN}/Visune-FlagshipInterior_INT151__Straight_3b4012e7-12d4-4c00-9b0d-9d43a0dedd49.jpg?v=1768826021&width=800`
	},
	{
		cat: "Studios",
		brand: "Visune",
		title: "White on White Studio",
		price: "35",
		img: `${CDN}/Visune-WhiteonWhiteStudio_STU123__CameraConcept.jpg?v=1753437972&width=800`
	},
	{
		cat: "Elements",
		brand: "Visune",
		title: "Hand Elements",
		price: "70",
		img: `${CDN}/Visune_HandElementsThumbnail.jpg?v=1746085032&width=800`
	},
	{
		cat: "Studios",
		brand: "Visune",
		title: "Essential Studio Collection (Gen2)",
		price: "90",
		img: `${CDN}/Visune_EssentialStudioCollectionThumbnail-17.jpg?v=1752050693&width=800`
	},
	{
		cat: "Plants",
		brand: "Visune",
		title: "Plant Collection",
		price: "130",
		img: `${CDN}/Visune-PlantCollectionPromo.jpg?v=1750418204&width=800`
	},
	{
		cat: "Interiors",
		brand: "Visune",
		title: "Loft Office",
		price: "70",
		img: `${CDN}/Visune-LoftOffice_INT090__Main.jpg?v=1725964927&width=800`
	}
];
var buildYourImage = [
	{
		title: "Traditional Kitchen",
		price: "60",
		img: `${CDN}/Visune-TraditionalKitchen_INT053_Wide.jpg?v=1694162008&width=800`
	},
	{
		title: "Food Set 1",
		price: "40",
		img: `${CDN}/Visune-FoodSet1_DEC004_CollectionPromo_Collection.jpg?v=1756308205&width=800`
	},
	{
		title: "Plant Set 2",
		price: "35",
		img: `${CDN}/Plant-Collection-2.jpg?v=1686828771&width=800`
	},
	{
		title: "Dining Table",
		price: "10",
		img: "https://visune.io/cdn/shop/products/Dining-Table.jpg?v=1674819349&width=800"
	}
];
var whyChoose = [
	{
		title: "Save your time for designing",
		body: "Every asset we sell comes ready-to-render. Whether it's photorealistic scenes or drag-and-drop contextual props, our resources are there to speed up your process.",
		img: `${CDN}/Momnt_X_Harry_Chapman_-_Flexible_Float_Studio_STU037_Warm.jpg?v=1687803369&width=800`
	},
	{
		title: "Level up your renders",
		body: "Our artists are all trained Product Designers with a passion for visualisation. We use our extensive experience communicating projects in every resource we develop.",
		img: `${CDN}/Momnt_FireplaceIDiorama_SohoHomeChair_OjasSpeaker_f826c973-def6-43bc-a04c-d1f5daeeee6a.jpg?v=1687803507&width=800`
	},
	{
		title: "Maximise your hardware",
		body: "Our resources are meticulously tested and optimised to run as fast as possible on a wide range of hardware. From laptops to workstations, Visune resources will help you get the most out of your tools.",
		img: `${CDN}/Laptop_KeyShot.jpg?v=1687803749&width=800`
	},
	{
		title: "Take control of your visuals",
		body: "Whether it's e-commerce or client projects, Visune resources can help you bring your visuals in house.",
		img: `${CDN}/Kenwood_Food_Processor_-_Cluster_Studio_9a552fe5-7b32-4e49-abb0-ccd756d65112.jpg?v=1691047226&width=800`
	}
];
var heroAsset = { url: "https://visune.io/cdn/shop/files/Visune_-_Packshot_Reference_Studio_STU165__Detail_with_Physical_Lights.jpg?v=1779865356&width=1800" };
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 24
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
function Reveal({ children, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className,
		variants: fadeUp,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount: .2
		},
		transition: { delay },
		children
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				scale: .98
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			transition: { duration: .7 },
			className: "relative overflow-hidden rounded-3xl bg-black bg-cover bg-center bg-no-repeat",
			style: { backgroundImage: `url('${heroAsset.url}')` },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-[520px] items-center p-8 text-white sm:p-12 lg:min-h-[640px] lg:p-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl",
							children: [
								"Photorealistic ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"3D Product Visualization"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-md text-sm text-white/85 sm:text-base",
							children: "Premium renders and animations for brands and e-commerce."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#book-a-call",
							className: "mt-8 inline-flex items-center gap-2 rounded-full bg-[#d2ff3a] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#c4f52c]",
							children: ["Book a Call", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			})
		})
	});
}
function LogosStrip() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mx-auto max-w-3xl text-center text-2xl font-semibold leading-snug tracking-tight sm:text-3xl",
			children: [
				"Join thousands of designers and ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
				"accelerate your visualisation workflow"
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "flex items-center gap-14",
				animate: { x: ["0%", "-50%"] },
				transition: {
					duration: 30,
					ease: "linear",
					repeat: Infinity
				},
				children: [...brandLogos, ...brandLogos].map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: b.src,
					alt: b.name,
					className: "h-8 w-auto flex-shrink-0 object-contain opacity-70 grayscale sm:h-10",
					loading: "lazy"
				}, i))
			})
		})]
	});
}
function BringToLife() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "mb-8 flex flex-wrap items-end justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Bring your designs to life"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-neutral-600 sm:text-base",
				children: "Create market-ready product renders in minutes, not hours"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: bringToLifeCards.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .06,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
					href: "#",
					whileHover: { y: -6 },
					className: "group block overflow-hidden rounded-2xl bg-neutral-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[3/4] overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: c.img,
							alt: c.title,
							className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
							loading: "lazy"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-3 bottom-3 rounded-xl bg-white/95 p-4 backdrop-blur",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-xs text-neutral-600",
									children: c.body
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-2 inline-flex items-center gap-1 text-xs font-medium text-black",
									children: [
										c.cta,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })
									]
								})
							]
						})]
					})
				})
			}, c.title))
		})]
	});
}
function SubscribeAndSave() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neutral-800/60 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-semibold tracking-tight sm:text-4xl",
						children: "Subscribe and Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "inline-flex items-center gap-1 rounded-full border border-white/20 px-5 py-2 text-sm font-medium hover:bg-white/10 transition",
						children: ["Learn More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3",
					children: [
						{
							icon: Download,
							title: "Up to 59% Discount for Individuals",
							body: "Save big with our offering of individual plans and get Units deposited into your account each month."
						},
						{
							icon: Lock,
							title: "Subscription Exclusives",
							body: "Get access to the highest quality resources, hand-picked by our team of artists specifically for subscribers."
						},
						{
							icon: Cloud,
							title: "Live Chat Support",
							body: "Have an issue? Keep your projects moving forward with live chat support delivered by our team of 3D artists."
						}
					].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * .08,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, {
								className: "h-8 w-8 text-white/80",
								strokeWidth: 1.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold",
								children: it.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-white/70",
								children: it.body
							})
						]
					}, it.title))
				})]
			})]
		})
	});
}
function Featured() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Featured resources"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-neutral-600",
				children: "Our new and most popular resources"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
			children: featured.slice(0, 8).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .03,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p })
			}, p.title + i))
		})]
	});
}
function ProductCard({ p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
		href: "#",
		whileHover: { y: -4 },
		className: "group block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-2xl bg-neutral-100",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: p.img,
					alt: p.title,
					className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
					loading: "lazy"
				})
			}), p.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-3 top-3 rounded-full bg-black/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white",
				children: p.tag
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-medium leading-snug text-neutral-900",
				children: p.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-2 text-xs text-neutral-600",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-semibold text-neutral-900",
					children: [p.price, " Units"]
				}), p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-neutral-400 line-through",
					children: [p.oldPrice, " Units"]
				})]
			})]
		})]
	});
}
function SyncSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 items-center gap-8 rounded-3xl bg-neutral-50 p-6 sm:p-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
					children: [
						"Sync straight to ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						" KeyShot and Blender"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-sm text-neutral-600 sm:text-base",
					children: "Install our companion app and put your Visune purchases right into KeyShot and Blender's UI, ready for drag-and-drop deployment into your scenes."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition",
					children: ["Download now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `${CDN}/Companion_App_Drop_Shadow_26653b58-1fe1-49b9-b2ad-d451cd399f58.jpg?v=1779349603&width=1200`,
					alt: "Companion app",
					className: "w-full rounded-2xl object-cover",
					loading: "lazy"
				})
			})]
		})
	});
}
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Supporting 10,000+ designers"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-3",
			children: [[{
				name: "James Melia",
				role: "Creative Director, Blond",
				quote: "Visune's assets allow the team to contextualise their designs with ease and efficiency. We would highly recommend to freelance industrial designers, studios and art directors working in Keyshot."
			}, {
				name: "Mark Reilly",
				role: "Co-founder, Beta Design Office",
				quote: "Visune library of resources has been extremely valuable to our process at beta. It saves time and cost which allows us to work more efficiently and to a higher standard."
			}].map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-neutral-200 bg-white p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold",
							children: q.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-neutral-500",
							children: q.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm italic text-neutral-700",
							children: [
								"\"",
								q.quote,
								"\""
							]
						})
					]
				})
			}, q.name)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .24,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden overflow-hidden rounded-2xl md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `${CDN}/Visune_-_Loft_Diorama_INT152__Objects_Thumbnail_Promo_3ac8398f-0aab-47f4-a7d0-0ab4ff488315.jpg?v=1775753152&width=800`,
						alt: "Interior",
						className: "h-full w-full object-cover",
						loading: "lazy"
					})
				})
			})]
		})]
	});
}
function BlenderPromo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 items-stretch gap-4 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "lg:col-span-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-full overflow-hidden rounded-3xl bg-neutral-900 p-8 text-white sm:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "max-w-md text-2xl font-semibold sm:text-3xl",
							children: "120+ Professional Blender Resources"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm text-white/70",
							children: "Our collection of Blender-compatible resources is growing fast. From eye-catching studio scenes and photo-realistic interiors to posed hands and plant decorations, we have everything you need to bring your designs to life."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#",
							className: "mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition",
							children: ["Shop Blender Resources ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				className: "lg:col-span-2",
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `${CDN}/Visune_Blender_Intro.jpg?v=1737983394&width=800`,
					alt: "Blender",
					className: "h-full w-full rounded-3xl object-cover",
					loading: "lazy"
				})
			})]
		})
	});
}
function GoToResources() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Go-to Resources"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-neutral-600",
				children: "Our top picks for industrial, furniture and automotive design"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
			children: goto.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .03,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
					href: "#",
					whileHover: { y: -4 },
					className: "group block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-2xl bg-neutral-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.img,
								alt: p.title,
								className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
								loading: "lazy"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[10px] font-medium uppercase tracking-wider text-neutral-500",
								children: [
									p.brand,
									" · ",
									p.cat
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-sm font-medium",
								children: p.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs font-semibold text-neutral-900",
								children: [p.price, " Units"]
							})
						]
					})]
				})
			}, p.title))
		})]
	});
}
function IndustrialEssentials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] space-y-6 px-4 py-12 sm:px-6 lg:px-10",
		children: [{
			kicker: "Industrial Design Essentials",
			title: "Industrial Design Material Collection",
			body: "Overhauled for 2026, this bundle contains 120 detailed materials, in both KeyShot and Blender native formats, with accompanying textures for use in any software. This go-to starter library spans five families, delivering materials from moulded plastics and anodized metals to braided cables and neoprene.",
			cta: "Shop now",
			img: `${CDN}/Visune_-_ID_Material_Collection_Thumbnail_V4_Clean.jpg?v=1779830273&width=1600`,
			reverse: false
		}, {
			kicker: "Furniture Design Essentials",
			title: "Essential Studio Collection (Gen2)",
			body: "Our Essential Studio Collection is a must-have for industrial and furniture designers using KeyShot. These five scenes have been meticulously crafted by our team of artists, using our best practices from years as a visualisation agency and asset distributor.",
			cta: "Shop now",
			img: `${CDN}/gen2.jpg?v=1775832639&width=1600`,
			reverse: true
		}].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			delay: i * .05,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl bg-neutral-900 text-white lg:grid-cols-2 ${r.reverse ? "" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-8 sm:p-12 ${r.reverse ? "lg:order-2" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-widest text-white/60",
							children: r.kicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-2xl font-semibold sm:text-3xl",
							children: r.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-white/70",
							children: r.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#",
							className: "mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-neutral-200 transition",
							children: [
								r.cta,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `${r.reverse ? "lg:order-1" : ""} h-[280px] w-full sm:h-[360px]`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.img,
						alt: r.title,
						className: "h-full w-full object-cover",
						loading: "lazy"
					})
				})]
			})
		}, r.title))
	});
}
function BeforeAfter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "You bring the design, we bring the rest"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-2",
			children: [{
				label: "Before",
				img: `${CDN}/Visune_-_Loft_Diorama_INT152__Build_Your_Scene_Promo_Clay_Before.jpg?v=1776063379&width=1200`
			}, {
				label: "After",
				img: `${CDN}/Visune_-_Loft_Diorama_INT152__Build_Your_Scene_Promo_After.jpg?v=1776063396&width=1200`
			}].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-medium",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.img,
					alt: s.label,
					className: "aspect-[4/3] w-full object-cover",
					loading: "lazy"
				})]
			}, s.label))
		})]
	});
}
function BuildYourImage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
			className: "mb-8 flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Build your image"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-neutral-600",
				children: "Mix and match resources to create your final image"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "#",
				className: "inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4",
				children: ["Shop all resources ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-4",
			children: buildYourImage.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
					href: "#",
					whileHover: { y: -4 },
					className: "group block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-2xl bg-neutral-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.img,
									alt: p.title,
									className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
									loading: "lazy"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-sm font-medium",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs font-semibold text-neutral-900",
							children: [p.price, " Units"]
						})
					]
				})
			}, p.title))
		})]
	});
}
function WhyChoose() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			className: "mb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl font-semibold tracking-tight sm:text-4xl",
				children: "Why choose Visune?"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
			children: whyChoose.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-2xl bg-neutral-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/3]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: w.img,
							alt: w.title,
							className: "h-full w-full object-cover",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold",
							children: w.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-neutral-600",
							children: w.body
						})]
					})]
				})
			}, w.title))
		})]
	});
}
function FinalCTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 items-stretch gap-4 overflow-hidden rounded-3xl bg-neutral-100 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-8 sm:p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
						children: [
							"We build the foundation.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							" You create without limits."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-sm text-neutral-700",
						children: "Be it client communications, portfolio refreshes or social media marketing, Visune resources are there to support you. Join our fast-growing network of designers and create the renders your designs deserve."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-800 transition",
						children: ["Shop the full collection ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-[280px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `${CDN}/Momnt_FloatingAd_Hasselblad_Camera.jpg?v=1687456193&width=1200`,
					alt: "Camera render",
					className: "h-full w-full object-cover",
					loading: "lazy"
				})
			})]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "bg-neutral-950 text-neutral-300",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-10 lg:grid-cols-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold text-white lowercase",
							children: "visune"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xs text-sm text-neutral-400",
							children: "Visune provides professional 3D assets to support designers with digital product renderings, including interior and studio scenes and drag-and-drop materials."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:support@visune.io",
								"aria-label": "Email",
								className: "rounded-full border border-white/10 p-2 hover:bg-white/10 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://instagram.com/visune",
								"aria-label": "Instagram",
								className: "rounded-full border border-white/10 p-2 hover:bg-white/10 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" })
							})]
						})
					] }), [
						{
							title: "Shop",
							links: [
								"Studios",
								"Interiors",
								"Materials",
								"Models",
								"Elements",
								"Plants"
							]
						},
						{
							title: "Company",
							links: [
								"About",
								"License",
								"Contact",
								"Careers"
							]
						},
						{
							title: "Support",
							links: [
								"Help Center",
								"Tutorials",
								"Companion App",
								"Terms",
								"Privacy"
							]
						}
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold text-white",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3 text-sm text-neutral-400",
						children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-white transition",
							children: l
						}) }, l))
					})] }, c.title))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 rounded-2xl border border-white/10 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-lg font-semibold text-white",
							children: "Join our newsletter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-neutral-400",
							children: "Be the first to hear about new products and discounts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-4 flex flex-col gap-2 sm:flex-row",
							onSubmit: (e) => e.preventDefault(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								required: true,
								placeholder: "you@studio.com",
								className: "flex-1 rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/30 focus:outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-200 transition",
								children: "Submit"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Copyright © 2026 Visune." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "All rights reserved." })]
				})
			]
		})
	});
}
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogosStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BringToLife, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscribeAndSave, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlenderPromo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoToResources, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndustrialEssentials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeforeAfter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuildYourImage, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyChoose, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {})
	] });
}
//#endregion
export { HomePage as component };
