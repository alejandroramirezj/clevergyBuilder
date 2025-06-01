import React from 'react';
import { Lightbulb, Sun, Euro, Info } from 'lucide-react';
import { HouseDetail } from '@/types/house';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HouseStatusIconsProps {
  houseDetail: HouseDetail;
  onlyInfoIcon?: boolean;
  onlyIcons?: boolean;
}

const scrollToApiBlock = (houseId: string) => {
  const el = document.getElementById(`api-get-house-details-${houseId}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('ring-2', 'ring-blue-400');
    setTimeout(() => {
      el.classList.remove('ring-2', 'ring-blue-400');
    }, 2000);
  }
};

const HouseStatusIcons: React.FC<HouseStatusIconsProps> = ({ houseDetail, onlyInfoIcon, onlyIcons }) => {
  const { houseMetadata, houseIntegrations } = houseDetail;
  const houseId = houseDetail.details.houseId;

  return (
    <TooltipProvider>
      <div className={`flex ${onlyIcons ? 'items-center gap-2' : onlyInfoIcon ? 'justify-end w-full' : 'flex-col items-center gap-1 w-full'}`}>
        {/* Icono de información */}
        {!onlyIcons && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="align-middle inline-flex"><Info size={20} className="text-blue-500 cursor-help" /></span>
            </TooltipTrigger>
            <TooltipContent className="max-w-[370px]">
              <div className="space-y-2">
                <p className="font-semibold text-base">Información del estado de la casa</p>
                <p className="text-sm text-gray-600">
                  Estos datos se obtienen de la llamada a la API en la consola:
                </p>
                <a
                  href={`#api-get-house-details-${houseId}`}
                  onClick={e => {
                    e.preventDefault();
                    scrollToApiBlock(houseId);
                  }}
                  className="block w-full bg-gray-100 px-2 py-1 rounded text-xs font-mono text-blue-700 hover:bg-blue-50 text-left mb-2 border border-blue-100 transition cursor-pointer"
                  style={{ outline: 'none' }}
                >
                  Ir a la sección de la consola
                </a>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-gray-700">
                    <div className="font-semibold">Campo</div>
                    <div className="font-semibold">Valor</div>
                    <div>Consumo <span className="text-gray-400">(firstDateEnergy)</span></div>
                    <div>{houseMetadata?.firstDateEnergy ? <span className="text-green-700">{houseMetadata.firstDateEnergy}</span> : <span className="text-gray-400">No disponible</span>}</div>
                    <div>Producción <span className="text-gray-400">(firstDatePower)</span></div>
                    <div>{houseMetadata?.firstDatePower ? <span className="text-orange-600">{houseMetadata.firstDatePower}</span> : <span className="text-gray-400">No disponible</span>}</div>
                    <div>Costes <span className="text-gray-400">(firstDateCost)</span></div>
                    <div>{houseMetadata?.firstDateCost ? <span className="text-green-700">{houseMetadata.firstDateCost}</span> : <span className="text-gray-400">No disponible</span>}</div>
                    <div>Huawei <span className="text-gray-400">(status)</span></div>
                    <div>{houseIntegrations?.huaweiB2C?.status === 'CONNECTED' ? <span className="text-blue-700">CONNECTED</span> : <span className="text-gray-400">NONE</span>}</div>
                    <div>Fronius <span className="text-gray-400">(status)</span></div>
                    <div>{houseIntegrations?.froniusB2C?.status === 'CONNECTED' ? <span className="text-blue-700">CONNECTED</span> : <span className="text-gray-400">NONE</span>}</div>
                  </div>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        )}
        {/* Iconos de estado */}
        {!onlyInfoIcon && (
          <div className="flex items-center gap-2">
            {/* Icono de consumo */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Lightbulb 
                    size={16} 
                    className={houseMetadata?.firstDateEnergy ? "text-yellow-500" : "text-gray-300"} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Consumo de energía</p>
                <p className="text-xs text-gray-500">{houseMetadata?.firstDateEnergy ? `Tiene datos de consumo (${houseMetadata.firstDateEnergy})` : "No tiene datos de consumo"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Icono de producción */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Sun 
                    size={16} 
                    className={houseMetadata?.firstDatePower ? "text-orange-500" : "text-gray-300"} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Producción solar</p>
                <p className="text-xs text-gray-500">{houseMetadata?.firstDatePower ? `Tiene datos de producción (${houseMetadata.firstDatePower})` : "No tiene datos de producción"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Icono de euros */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Euro 
                    size={16} 
                    className={houseMetadata?.firstDateCost ? "text-green-500" : "text-gray-300"} 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Costes energéticos</p>
                <p className="text-xs text-gray-500">{houseMetadata?.firstDateCost ? `Tiene datos en euros (${houseMetadata.firstDateCost})` : "No tiene datos en euros"}</p>
              </TooltipContent>
            </Tooltip>

            {/* Iconos de integraciones */}
            {houseIntegrations?.huaweiB2C && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <img 
                      src="/clevergyBuilder/favicons/huawei.svg" 
                      alt="Huawei" 
                      className={`w-4 h-4 ${houseIntegrations.huaweiB2C.status === "CONNECTED" ? "opacity-100" : "opacity-30"}`}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Integración Huawei</p>
                  <p className="text-xs text-gray-500">Estado: {houseIntegrations.huaweiB2C.status || "NONE"}</p>
                </TooltipContent>
              </Tooltip>
            )}

            {houseIntegrations?.froniusB2C && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <img 
                      src="/clevergyBuilder/favicons/fronius.svg" 
                      alt="Fronius" 
                      className={`w-4 h-4 ${houseIntegrations.froniusB2C.status === "CONNECTED" ? "opacity-100" : "opacity-30"}`}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Integración Fronius</p>
                  <p className="text-xs text-gray-500">Estado: {houseIntegrations.froniusB2C.status || "NONE"}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default HouseStatusIcons; 