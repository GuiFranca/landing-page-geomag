"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FaMapMarkedAlt, FaLeaf, FaWater, FaTree, FaMap, FaFileAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from "react-icons/fa"
import { MdOutlineEngineering } from "react-icons/md"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section com Vídeo */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Image 
            src="/logotipo.svg" 
            alt="GeoMAG Logo" 
            width={300} 
            height={150} 
            className="mx-auto mb-8 filter drop-shadow-lg"
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Soluções Topográficas de Alta Precisão
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-200">
            Especialistas em levantamento topográfico, georreferenciamento e regularização fundiária.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300">
              Solicite um Orçamento
            </Button>
          </motion.div>
        </motion.div>
      </header>
      
      {/* Serviços */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaLeaf,
                title: "Licenciamento Ambiental",
                description: "Licenciamentos ambientais em empreendimentos e atividades variadas",
                color: "green"
              },
              {
                icon: FaWater,
                title: "Outorga",
                description: "Licença de perfuração e captação, travessia, canalização, barragens e tanques",
                color: "blue"
              },
              {
                icon: FaMapMarkedAlt,
                title: "Georreferenciamento de Imóveis Rurais",
                description: "Tecnologia de acordo com a legislação nacional",
                color: "yellow"
              },
              {
                icon: MdOutlineEngineering,
                title: "Topografia",
                description: "Levantamento planialtimétrico, batimetria, obras, retificação e desmembramento",
                color: "red"
              },
              {
                icon: FaMap,
                title: "Geoprocessamento",
                description: "Redes de drenagem, uso e ocupação do solo, declividade e orientação de relevo",
                color: "purple"
              },
              {
                icon: FaFileAlt,
                title: "CAR - Cadastro Ambiental Rural",
                description: "Registro, documentação e informações de propriedades rurais",
                color: "emerald"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <service.icon className={`text-${service.color}-600 text-5xl mx-auto mb-6`} />
                      <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Entre em Contato</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">Tire suas dúvidas ou solicite um orçamento. Estamos à disposição!</p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Input placeholder="Nome" className="h-12 rounded-lg" />
                <Input type="email" placeholder="E-mail" className="h-12 rounded-lg" />
                <Input type="tel" placeholder="Telefone" className="h-12 rounded-lg" />
              </div>
              <div>
                <Textarea 
                  placeholder="Mensagem" 
                  className="h-full min-h-[200px] rounded-lg resize-none" 
                />
              </div>
            </div>
            <motion.div
              className="mt-8 text-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto px-8 py-4 text-lg rounded-lg">
                Enviar Mensagem
              </Button>
            </motion.div>
          </motion.div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-700">
            <a href="tel:+XX-XXXX-XXXX" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
              <FaPhoneAlt className="text-2xl" />
              <span>(XX) XXXX-XXXX</span>
            </a>
            <a href="mailto:contato@geomag.com.br" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
              <FaEnvelope className="text-2xl" />
              <span>contato@geomag.com.br</span>
            </a>
            <a href="https://wa.me/XXXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-green-600 transition-colors">
              <FaWhatsapp className="text-2xl" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 