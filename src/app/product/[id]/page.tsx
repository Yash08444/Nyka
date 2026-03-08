"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    Heart,
    Share2,
    ChevronRight,
    Star,
    ChevronLeft
} from "lucide-react";
import { ConfidenceMeter } from "@/components/ConfidenceMeter";
import { AITryOn } from "@/components/AITryOn";
import { FabricEnhance } from "@/components/FabricVideo";
import { SizeChart } from "@/components/SizeChart";
import { DeliveryCheck } from "@/components/DeliveryCheck";
import { SizePredictor } from "@/components/SizePredictor";
import { RecommendedProducts } from "@/components/RecommendedProducts";
import { useCart } from "@/context/CartContext";

const productData = {
    "1": {
        name: "Slumber Jill Lacy Dreams Night Dress",
        brand: "Slumber Jill",
        price: "₹1,899",
        images: [
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/Slumber%20Jill%20Lacy%20Dreams%20Night%20Dress%20Made%20of%20Viscose%20in%20Livaeco/1.png",
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/Slumber%20Jill%20Lacy%20Dreams%20Night%20Dress%20Made%20of%20Viscose%20in%20Livaeco/2.png"
        ],
        videoUrl: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/Slumber%20Jill%20Lacy%20Dreams%20Night%20Dress%20Made%20of%20Viscose%20in%20Livaeco/grok-video-2b838385-11b7-44b4-943f-108993248d24.mp4",
        description: "Experience unparalleled comfort with our Lacy Dreams Night Dress. Crafted from eco-friendly Viscose in Livaeco, this dress features delicate lace detailing for a touch of nightly luxury.",
        details: ["Viscose in Livaeco", "Lace Detailing", "Eco-friendly Fabric", "Breathable Material"],
        confidence: 92
    },
    "2": {
        name: "Blue and Green Tropical Print Viscose Kurta",
        brand: "The Kaftan Company",
        price: "₹2,450",
        images: [
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/1.png",
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/2.png",
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/3.png"
        ],
        videoUrl: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20and%20Green%20Tropical%20Print%20Viscose%20Kurta/grok-video-fe97bb08-6021-478f-aa5f-6e640e8cac67.mp4",
        description: "Vibrant tropical prints meet effortless style in this viscose kurta. Perfect for a breezy afternoon look.",
        details: ["Tropical Print", "Lightweight Viscose", "Comfortable Fit", "Dry Clean Recommended"],
        confidence: 88
    },
    "3": {
        name: "Blue Floral Hooded Lounge Dress",
        brand: "The Kaftan Company",
        price: "₹2,800",
        images: [
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/1.png",
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/2.png"
        ],
        videoUrl: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Blue%20Floral%20Hooded%20Lounge%20Dress/grok-video-231502d7-bafd-4770-b57f-a1010a496b7c.mp4",
        description: "Cozy meets chic in this hooded lounge dress. Featuring a beautiful blue floral pattern and a relaxed fit for ultimate home comfort.",
        details: ["Hooded Design", "Floral Pattern", "Premium Lounge Fabric", "Bilateral Pockets"],
        confidence: 85
    },
    "4": {
        name: "Yellow Floral Maternity And Feeding Dress",
        brand: "The Kaftan Company",
        price: "₹3,200",
        images: [
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/1.png",
            "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/2.png"
        ],
        videoUrl: "https://mmfqtcwlnckpqfmlkovo.supabase.co/storage/v1/object/public/Product%20Name/Products/The%20Kaftan%20Company%20Yellow%20Floral%20Maternity%20And%20Feeding%20Dress/grok-video-2a279371-0cc0-43c9-bfe5-37aaea29619c.mp4",
        description: "Designed for the modern mother, this yellow floral dress combines functionality with a bright, cheerful aesthetic. Perfect for pregnancy and nursing.",
        details: ["Maternity & Feeding Friendly", "Soft Breathable Fabric", "Adjustable Fit", "Cheery Floral Design"],
        confidence: 94
    },
    "default": {
        name: "Designer Edit Piece",
        brand: "Luxury Collection",
        price: "₹45,000",
        images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop"],
        videoUrl: "",
        description: "Elegant and timeless design from our premium curators. Crafted with the finest materials.",
        details: ["Premium Material", "Tailored Fit", "Limited Edition"],
        confidence: 72
    }
};

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const product = productData[id as keyof typeof productData] || productData.default;
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [currentConfidence, setCurrentConfidence] = useState(product.confidence);
    const [isTryOnDone, setIsTryOnDone] = useState(false);
    const [addedMsg, setAddedMsg] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { addToCart } = useCart();

    const handleAddToCart = (source?: string) => {
        addToCart({
            id: id || "1",
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.images[0],
            size: selectedSize || undefined,
        });
        setAddedMsg(source === "tryon" ? "AI Fit Added!" : "Added to Bag!");
        setTimeout(() => setAddedMsg(""), 2000);
    };

    const handleTryOnSuccess = () => {
        if (!isTryOnDone) {
            setCurrentConfidence(prev => Math.min(prev + 30, 99)); // +30% boost
            setIsTryOnDone(true);
        }
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.offsetWidth;
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const index = Math.round(scrollLeft / width);
            if (index !== activeImage) {
                setActiveImage(index);
            }
        }
    };

    const scrollToImage = (index: number) => {
        if (scrollContainerRef.current) {
            const width = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
                left: width * index,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="bg-background min-h-screen pb-48 overflow-x-hidden">
            {/* Header / Top Bar - Centered in Shell */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[100] bg-white/95 backdrop-blur-md h-14 flex items-center px-4 border-b border-muted/30">
                <button onClick={() => router.back()} className="tap-target p-2 -ml-2 text-foreground">
                    <ChevronLeft size={22} />
                </button>
                <div className="flex-1 text-center pr-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-luxury-stone">{product.brand}</span>
                </div>
            </div>

            <div className="pt-14 px-0">
                {/* Narrow Shell Navigation */}
                <nav className="flex items-center space-x-1.5 py-4 text-[8px] uppercase tracking-widest text-luxury-stone font-bold px-4">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={8} />
                    <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight size={8} />
                    <span className="text-foreground/60 truncate">{product.brand}</span>
                </nav>

                <div className="flex flex-col">
                    {/* Gallery: Single Column for Shell */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <div
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="aspect-[3/4] overflow-x-auto flex snap-x snap-mandatory no-scrollbar"
                            >
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="flex-shrink-0 w-full h-full snap-center">
                                        <img
                                            src={img}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none z-30">
                                <button
                                    onClick={() => scrollToImage(activeImage - 1)}
                                    disabled={activeImage === 0}
                                    className={`pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white shadow-xl transition-all active:scale-90 ${activeImage === 0 ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => scrollToImage(activeImage + 1)}
                                    disabled={activeImage === product.images.length - 1}
                                    className={`pointer-events-auto w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white shadow-xl transition-all active:scale-90 ${activeImage === product.images.length - 1 ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                {product.images.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === idx ? "w-4 bg-primary" : "w-1.5 bg-white/50"}`}
                                    />
                                ))}
                            </div>

                            <div className="absolute top-4 left-4 flex gap-2 z-20">
                                <span className="bg-primary text-white text-[8px] px-3 py-1 rounded-full uppercase tracking-widest font-bold shadow-lg">New Season</span>
                            </div>

                            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                                <button className="w-9 h-9 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full text-foreground/70 shadow-xl active-scale">
                                    <Share2 size={16} />
                                </button>
                                <button className="w-9 h-9 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full text-foreground/70 shadow-xl active-scale">
                                    <Heart size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Slider */}
                        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollToImage(idx)}
                                    className={`flex-shrink-0 w-16 h-20 rounded-md overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary shadow-md" : "border-transparent opacity-60"
                                        }`}
                                >
                                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details: Stacked for Shell */}
                    <div className="flex flex-col p-4 bg-white">
                        <div className="mb-6">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold block mb-2">{product.brand}</span>
                            <h1 className="text-xl font-brand font-bold text-foreground mb-3 leading-tight">{product.name}</h1>

                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-brand font-bold text-foreground">{product.price}</span>
                                <div className="flex items-center gap-1.5 text-luxury-gold">
                                    <Star size={12} className="fill-current" />
                                    <span className="text-[10px] font-bold text-foreground">4.8</span>
                                    <span className="text-[9px] text-luxury-stone font-medium uppercase tracking-widest">(42 Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-luxury-stone font-light leading-relaxed mb-6 text-xs italic">
                            {product.description}
                        </p>

                        {/* Size Selection: Tighter for Shell */}
                        <div className="mb-8 p-4 bg-muted/20 rounded-lg border border-muted/50">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground">Select Size</span>
                                    {selectedSize && <span className="text-[9px] text-primary font-bold uppercase transition-all animate-fadeIn">(Selected: {selectedSize})</span>}
                                </div>
                                <div className="flex items-center gap-4">
                                    <SizePredictor
                                        productName={product.name}
                                        onSizeSelected={(size) => setSelectedSize(size)}
                                    />
                                    <SizeChart />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`tap-target h-10 min-w-[50px] px-4 text-[10px] font-bold transition-all rounded-sm border ${selectedSize === size
                                            ? "bg-foreground text-white border-foreground shadow-lg"
                                            : "bg-white text-foreground border-muted active:border-primary"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Check */}
                        <DeliveryCheck />

                        {/* AI Evaluation Features */}
                        <div className="space-y-4 mb-4 mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-muted"></div>
                                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-luxury-stone">Evaluation Studio</span>
                                <div className="h-px flex-1 bg-muted"></div>
                            </div>
                            <AITryOn
                                productImage={product.images[0]}
                                productName={product.name}
                                onSuccess={handleTryOnSuccess}
                                onAddToCart={() => handleAddToCart("tryon")}
                            />
                            <FabricEnhance
                                videoUrl={product.videoUrl}
                                productName={product.name}
                                fabricDetails={product.details}
                            />
                            <ConfidenceMeter score={currentConfidence} />
                        </div>
                    </div>

                    {/* Recommended Products */}
                    <RecommendedProducts />
                </div>
            </div>

            {/* Sticky Bottom Action Bar - Centered in Shell */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-[110] bg-white/95 backdrop-blur-md border-t border-muted p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
                {addedMsg && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] uppercase tracking-widest px-5 py-2 rounded-full shadow-xl animate-fadeIn font-bold">
                        ✓ {addedMsg}
                    </div>
                )}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex flex-col flex-shrink-0">
                        <span className="text-[9px] uppercase tracking-widest font-bold text-luxury-stone leading-tight">Price</span>
                        <span className="text-base font-brand font-bold text-foreground">{product.price}</span>
                    </div>
                    <div className="flex-1 flex gap-3 h-12">
                        <button
                            onClick={() => {
                                handleAddToCart();
                                router.push("/cart");
                            }}
                            className="flex-1 tap-target border border-foreground text-foreground text-[9px] uppercase tracking-widest font-bold active:bg-muted transition-all rounded-sm"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={() => {
                                handleAddToCart();
                                router.push("/cart");
                            }}
                            className="flex-[2] tap-target bg-primary text-white text-[9px] uppercase tracking-widest font-bold active:bg-primary/90 transition-all shadow-lg shadow-primary/20 rounded-sm"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
