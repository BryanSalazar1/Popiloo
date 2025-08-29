import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Star, Accessibility, Baby, Shield, Wifi, Sun, Droplet,
  Banknote, CreditCard, Search, Building2, Home, Settings,
  Megaphone, Clock, Crown, BarChart3
} from "lucide-react";




import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

// -----------------------------------------------------------------------------
// Mock data
// -----------------------------------------------------------------------------
const MOCK_RESTROOMS = [
  {
    id: "r1",
    name: "Café Chapultepec – Baño 1",
    business: "Café Chapultepec",
    coords: [-103.360, 20.674],
    price: { cash: 8, digital: 10, currency: "MXN" },
    attrs: { wheelchair: true, baby: true, womenSafe: true, wifi: true, paper: true, soap: true, lighting: true },
    hoursToday: [{ open: "08:00", close: "22:00" }],
    rating: 4.6,
    ratingCount: 128,
    certification: "premium",
    is24x7: false,
  },
  {
    id: "r2",
    name: "OXXO Centro Histórico – Sanitario",
    business: "OXXO Centro",
    coords: [-103.348, 20.676],
    price: { cash: 7, digital: 9, currency: "MXN" },
    attrs: { wheelchair: true, baby: false, womenSafe: true, wifi: false, paper: true, soap: true, lighting: true },
    hoursToday: [{ open: "00:00", close: "23:59" }],
    rating: 4.2,
    ratingCount: 92,
    certification: "none",
    is24x7: true,
  },
];

const MXN = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

// -----------------------------------------------------------------------------
// UI helpers
// -----------------------------------------------------------------------------
function Pill({ children }) {
  return <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs border">{children}</span>;
}

function AttrBadges({ a }) {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {a.wheelchair && <Badge className="gap-1"><Accessibility className="h-3 w-3"/> Accesible</Badge>}

      {a.baby && <Badge className="gap-1"><Baby className="h-3 w-3"/> Cambiador</Badge>}
      {a.womenSafe && <Badge className="gap-1"><Shield className="h-3 w-3"/> Seguro</Badge>}
      {a.wifi && <Badge className="gap-1"><Wifi className="h-3 w-3"/> Wi-Fi</Badge>}
      {a.paper && <Badge className="gap-1"><Sun className="h-3 w-3"/> Papel</Badge>}
      {a.soap && <Badge className="gap-1"><Droplet className="h-3 w-3"/> Jabón</Badge>}
      {a.lighting && <Badge className="gap-1"><Sun className="h-3 w-3"/> Iluminación</Badge>}
    </div>
  );
}


function Stars({ value }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(value));
  return (
    <div className="flex items-center gap-1" aria-label={`Calificación ${value}`}>
      {stars.map((on, i) => (
        <Star key={i} className={`h-4 w-4 ${on ? "fill-yellow-400 stroke-yellow-500" : "stroke-gray-300"}`} />
      ))}
      <span className="text-sm text-gray-600">{value.toFixed(1)}</span>
    </div>
  );
}

function TopNav({ current, onNavigate }) {
  const items = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "search", label: "Buscar baño", icon: Search },
    { id: "detail", label: "Detalle", icon: MapPin },
    // { id: "checkout", label: "Pago", icon: CreditCard },   // ← temporalmente fuera
    // { id: "dashboard", label: "Dashboard", icon: Building2 }, // ← temporalmente fuera
    // { id: "admin", label: "Admin", icon: Settings },          // ← temporalmente fuera
  ];
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
        {items.map(({ id, label, icon: Icon }) => (
          <Button key={id} onClick={() => onNavigate(id)} variant={current === id ? "default" : "secondary"} className="rounded-2xl">
            <Icon className="h-4 w-4 mr-2" /> {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Views
// -----------------------------------------------------------------------------
function HomeView({ onGoSearch }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight">PopiLoo — Encuentra el baño más cercano, fácil y rápido</h1>
          <p className="text-gray-700">Baños verificados con filtros locales inteligentes: accesible, familiar con cambiador, seguro para mujeres, 24/7, Wi‑Fi, papel, jabón e iluminación.</p>
          <div className="flex gap-3">
            <Button onClick={onGoSearch} className="rounded-2xl gap-2"><Search className="h-4 w-4"/> Buscar ahora</Button>
            <Button variant="secondary" className="rounded-2xl gap-2"><Building2 className="h-4 w-4"/> Registrar mi negocio</Button>
          </div>
          <div className="flex gap-2 text-sm text-gray-600">
            <Pill>Pago digital o en efectivo</Pill>
            <Pill>Certificación Baño Popi Premium</Pill>
            <Pill>Publicidad hiperlocal</Pill>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border grid place-items-center text-center p-6">
            <div>
              <MapPin className="mx-auto h-10 w-10" />
              <p className="mt-2 text-gray-600">Mapa próximamente — integra MapLibre/Leaflet/Google Maps</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SearchFilters({ filters, setFilters, radius, setRadius }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-lg">Filtros</CardTitle></CardHeader>
      <CardContent className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Radio (m)</Label>
          <Slider value={[radius]} min={200} max={3000} step={50} onValueChange={(v)=>setRadius(v[0])} />
          <div className="text-sm text-gray-600">{radius} m</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["wheelchair", "Accesible"],
            ["baby", "Cambiador"],
            ["womenSafe", "Seguro mujeres"],
            ["wifi", "Wi‑Fi"],
            ["paper", "Papel"],
            ["soap", "Jabón"],
            ["lighting", "Iluminación"],
            ["is24x7", "24/7"],
          ].map(([k, label]) => (
            <div key={k} className="flex items-center justify-between border rounded-xl px-3 py-2">
              <Label htmlFor={`f-${k}`} className="text-sm">{label}</Label>
              <Switch id={`f-${k}`} checked={filters[k]} onCheckedChange={(v)=>setFilters((f)=>({ ...f, [k]: v }))} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SearchView({ onSelectRestroom }) {
  const [query, setQuery] = useState("");
  const [radius, setRadius] = useState(800);
  const [filters, setFilters] = useState({ wheelchair:false, baby:false, womenSafe:false, wifi:false, paper:false, soap:false, lighting:false, is24x7:false });

  const results = useMemo(() => {
    return MOCK_RESTROOMS.filter(r => {
      const q = query.trim().toLowerCase();
      const matchesQ = !q || r.name.toLowerCase().includes(q) || r.business.toLowerCase().includes(q);
      const ok = Object.entries(filters).every(([k, v]) => !v || (k === 'is24x7' ? r.is24x7 : r.attrs[k]));
      return matchesQ && ok;
    });
  }, [query, filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Buscar por nombre o negocio" value={query} onChange={(e)=>setQuery(e.target.value)} />
          <Button><Search className="h-4 w-4"/></Button>
        </div>
        <SearchFilters filters={filters} setFilters={setFilters} radius={radius} setRadius={setRadius} />
      </div>

      <div className="md:col-span-2 space-y-3">
        {results.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={()=>onSelectRestroom(r)}>
            <CardContent className="p-4 grid sm:grid-cols-4 gap-4 items-center">
              <div className="sm:col-span-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5"/>
                  <h3 className="font-semibold text-lg">{r.name}</h3>
                  {r.certification === 'premium' && <Badge className="ml-2 gap-1"><Crown className="h-3 w-3"/> Premium</Badge>}
                </div>
                <div className="text-sm text-gray-600">{r.business}</div>
                <div className="mt-1"><Stars value={r.rating} /> <span className="text-xs text-gray-500">({r.ratingCount})</span></div>
                <AttrBadges a={r.attrs} />
              </div>
              <div className="sm:col-span-1 text-right">
                <div className="text-sm text-gray-600">Precio desde</div>
                <div className="text-2xl font-bold">{MXN.format(r.price.cash)} <span className="text-sm text-gray-500">efectivo</span></div>
                <div className="text-sm text-gray-600">{MXN.format(r.price.digital)} digital</div>
                <div className="text-xs text-gray-500 mt-1">Hoy: {r.hoursToday.map(h=>`${h.open}–${h.close}`).join(", ")}</div>
              </div>
            </CardContent>
          </Card>
        ))}
        {results.length === 0 && <div className="text-gray-500">Sin resultados con estos filtros.</div>}
      </div>
    </div>
  );
}

function RestroomDetailView({ restroom }) {
  if (!restroom) return <div className="max-w-4xl mx-auto p-6 text-gray-600">Selecciona un baño desde la búsqueda.</div>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="sm:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5"/> {restroom.name} {restroom.certification === 'premium' && <Badge className="ml-2 gap-1"><Crown className="h-3 w-3"/> Premium</Badge>}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-gray-600">{restroom.business}</div>
            <Stars value={restroom.rating} />
            <AttrBadges a={restroom.attrs} />
            <div className="text-sm text-gray-600">Hoy: {restroom.hoursToday.map(h=>`${h.open}–${h.close}`).join(", ")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Tarifas</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            <div>{MXN.format(restroom.price.cash)} <span className="text-sm text-gray-500">efectivo</span></div>
            <div>{MXN.format(restroom.price.digital)} <span className="text-sm text-gray-500">digital</span></div>
            <Button className="w-full mt-2" onClick={()=>alert("Simular pago")}>
              <CreditCard className="h-4 w-4 mr-2"/> Pagar ahora
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// App shell
// -----------------------------------------------------------------------------
export default function PopiLooViews() {
  const [route, setRoute] = useState("home");
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <TopNav current={route} onNavigate={(r)=>setRoute(r)} />

      <AnimatePresence mode="wait">
        <motion.div key={route} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {route === "home" && <HomeView onGoSearch={()=>setRoute("search")} />}
          {route === "search" && <SearchView onSelectRestroom={(r)=>{ setSelected(r); setRoute("detail"); }} />}
          {route === "detail" && <RestroomDetailView restroom={selected} />}
        </motion.div>
      </AnimatePresence>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <Clock className="h-4 w-4"/> MVP de vistas — Agosto 2025

        </div>
        <div className="mt-2">Hecho con React, Tailwind y Framer Motion.</div>
      </footer>
    </div>
  );
}
