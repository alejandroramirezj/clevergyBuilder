
import React, { useEffect, useRef } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const ClervergyModules = ({ module, preview = false }) => {
  const energyPricesRef = useRef(null);

  useEffect(() => {
    if (preview && module.id === 'energy-prices' && energyPricesRef.current) {
      console.log('Clevergy energy prices component mounted in preview mode');
      // Verificar si el web component está disponible
      if (customElements.get('clevergy-energy-prices')) {
        console.log('clevergy-energy-prices web component is available');
      } else {
        console.log('clevergy-energy-prices web component is not yet available, waiting...');
        customElements.whenDefined('clevergy-energy-prices').then(() => {
          console.log('clevergy-energy-prices web component is now available');
        });
      }
    }
  }, [preview, module.id]);

  const renderModule = () => {
    switch (module.id) {
      case 'alert':
        return (
          <Alert className="border border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Este es un componente de alerta de Clevergy. Puedes configurar el tipo, mensaje y estilo.
            </AlertDescription>
          </Alert>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Botón Principal
              </Button>
              <Button variant="outline">
                Botón Secundario
              </Button>
              <Button variant="ghost">
                Botón Terciario
              </Button>
            </div>
            {!preview && (
              <p className="text-sm text-gray-600">
                Botones configurables con múltiples variantes y estilos personalizables.
              </p>
            )}
          </div>
        );

      case 'hero':
        return (
          <div className="py-12 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-lg">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Construye el futuro
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Crea interfaces increíbles con módulos de Clevergy
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Empezar ahora
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Ver demo
                </Button>
              </div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Componente de Tipografía
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Este es un componente de texto dinámico que permite múltiples variantes de tipografía, 
              desde títulos hasta párrafos y texto de apoyo.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>Texto</Badge>
              <Badge variant="secondary">Dinámico</Badge>
              <Badge variant="outline">Personalizable</Badge>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="w-full h-48 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-medium">Imagen Responsive</span>
            </div>
            {!preview && (
              <p className="text-sm text-gray-600">
                Componente de imagen con soporte para múltiples formatos y optimización automática.
              </p>
            )}
          </div>
        );

      case 'chart':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Gráfico de Datos</span>
                <Badge variant="secondary">Interactivo</Badge>
              </CardTitle>
              <CardDescription>
                Visualización de datos en tiempo real con múltiples tipos de gráficos disponibles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-medium">📊 Gráfico Interactivo</span>
              </div>
            </CardContent>
          </Card>
        );

      case 'energy-prices':
        if (preview) {
          // En modo preview, renderizamos el web component real de Clevergy
          return (
            <div className="w-full p-4" ref={energyPricesRef}>
              <clevergy-energy-prices data-show-energy-price-surplus="true"></clevergy-energy-prices>
            </div>
          );
        } else {
          // En modo edición, mostramos una representación visual
          return (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>⚡ Precios de Energía</span>
                  <Badge className="bg-yellow-500 text-white">En Vivo</Badge>
                </CardTitle>
                <CardDescription>
                  Microfrontend de Clevergy que muestra precios de energía en tiempo real.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                      <div className="text-sm text-gray-600">Precio Actual</div>
                      <div className="text-2xl font-bold text-orange-600">€0.15/kWh</div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                      <div className="text-sm text-gray-600">Próxima Hora</div>
                      <div className="text-2xl font-bold text-green-600">€0.12/kWh</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">📈 Gráfico de Precios 24h</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Este componente se renderiza como {'<clevergy-energy-prices data-show-energy-price-surplus="true" />'} en el HTML final.
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        }

      default:
        return (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{module.name}</h3>
            <p className="text-gray-600">{module.description}</p>
          </div>
        );
    }
  };

  return (
    <div className={`${preview ? '' : 'relative'}`}>
      {renderModule()}
    </div>
  );
};

export default ClervergyModules;
