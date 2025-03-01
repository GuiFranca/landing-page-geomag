import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FaMapMarkedAlt, FaCheckCircle, FaPhoneAlt, FaDraftingCompass } from "react-icons/fa";
import { MdOutlineEngineering } from "react-icons/md";
import { motion } from "framer-motion";
import Image from "next/image";
import logotipo from "@/public/logotipo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <header className="relative flex items-center justify-center h-[600px] bg-[url('/hero-topografia.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50" />
        <motion.div 
          className="relative text-center text-white p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image src={logotipo} alt="GeoMAG Logo" width={200} height={100} className="mx-auto" />
          <h1 className="text-4xl font-bold mt-4">Soluções Topográficas de Alta Precisão</h1>
          <p className="mt-4 text-lg">Especialistas em levantamento topográfico, georreferenciamento e regularização fundiária.</p>
          <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Solicite um Orçamento</Button>
        </motion.div>
      </header>
      
      {/* Serviços */}
      <section className="py-16 px-8 grid md:grid-cols-3 gap-8 container mx-auto">
        <Card>
          <CardContent className="p-6 text-center">
            <MdOutlineEngineering className="text-blue-600 text-5xl mx-auto" />
            <h2 className="text-xl font-bold mt-4">Levantamento Topográfico</h2>
            <p className="mt-2 text-gray-600">Medição e mapeamento de terrenos com equipamentos modernos e tecnologia avançada.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FaMapMarkedAlt className="text-green-600 text-5xl mx-auto" />
            <h2 className="text-xl font-bold mt-4">Georreferenciamento</h2>
            <p className="mt-2 text-gray-600">Delimitação de propriedades e certificação conforme normas do INCRA.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FaCheckCircle className="text-yellow-600 text-5xl mx-auto" />
            <h2 className="text-xl font-bold mt-4">Regularização Fundiária</h2>
            <p className="mt-2 text-gray-600">Assessoria para legalização de imóveis urbanos e rurais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <FaDraftingCompass className="text-red-600 text-5xl mx-auto" />
            <h2 className="text-xl font-bold mt-4">Projetos de Loteamento</h2>
            <p className="mt-2 text-gray-600">Planejamento e execução de loteamentos urbanos e rurais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <MdOutlineEngineering className="text-blue-600 text-5xl mx-auto" />
            <h2 className="text-xl font-bold mt-4">Locação de Obras</h2>
            <p className="mt-2 text-gray-600">Marcação precisa para execução de projetos de engenharia e construção civil.</p>
          </CardContent>
        </Card>
      </section>

      {/* Contato */}
      <section className="bg-white py-12 px-8 container mx-auto text-center">
        <h2 className="text-2xl font-bold">Entre em Contato</h2>
        <p className="text-gray-600 mt-2">Tire suas dúvidas ou solicite um orçamento. Estamos à disposição!</p>
        <div className="mt-6 max-w-xl mx-auto">
          <Input placeholder="Nome" className="mb-4" />
          <Input type="email" placeholder="E-mail" className="mb-4" />
          <Textarea placeholder="Mensagem" className="mb-4" rows={4} />
          <Button className="bg-blue-600 hover:bg-blue-700 w-full">Enviar</Button>
        </div>
        <div className="mt-6 text-gray-700">
          <p className="flex items-center justify-center gap-2"><FaPhoneAlt /> (XX) XXXX-XXXX</p>
        </div>
      </section>
    </div>
  );
}
