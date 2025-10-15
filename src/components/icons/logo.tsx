import Image from "next/image";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      {...props}
    >
      {/* Modern gaming mousepad logo */}
      <defs>
        <linearGradient id="padGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7D5DEC" />
          <stop offset="100%" stopColor="#29D8DB" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Mousepad base */}
      <rect
        x="80" 
        y="140" 
        width="352" 
        height="232" 
        rx="20" 
        ry="20" 
        fill="#1F2331" 
        stroke="url(#padGradient)" 
        strokeWidth="6"
      />
      
      {/* Mouse pad surface details */}
      <rect
        x="90" 
        y="150" 
        width="332" 
        height="212" 
        rx="15" 
        ry="15" 
        fill="#161A24" 
        opacity="0.9"
      />
      
      {/* Decorative RGB border effect */}
      <path
        d="M100 155 H402 A10 10 0 0 1 412 165 V375 A10 10 0 0 1 402 385 H100 A10 10 0 0 1 90 375 V165 A10 10 0 0 1 100 155 Z"
        fill="none"
        stroke="url(#padGradient)"
        strokeWidth="1"
        strokeDasharray="5,5"
        opacity="0.8"
        filter="url(#glow)"
      />
      
      {/* Mouse silhouette */}
      <path
        d="M256 190 C236 190 220 206 220 226 V286 C220 306 236 322 256 322 C276 322 292 306 292 286 V226 C292 206 276 190 256 190 Z"
        fill="#323849"
        stroke="url(#padGradient)"
        strokeWidth="2"
      />
      
      {/* Mouse buttons */}
      <path
        d="M220 245 H256 V190 C236 190 220 206 220 226 V245 Z"
        fill="#444E67"
        strokeWidth="0"
      />
      <path
        d="M256 190 V245 H292 V226 C292 206 276 190 256 190 Z"
        fill="#444E67"
        strokeWidth="0"
      />
      
      {/* Mouse wheel */}
      <rect x="253" y="220" width="6" height="20" rx="3" fill="#29D8DB" filter="url(#glow)" />
      
      {/* Text "PAD" below the mouse */}
      <text x="256" y="350" 
        fontFamily="Arial" 
        fontSize="32" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="url(#padGradient)" 
        filter="url(#glow)">
        PRO PAD
      </text>
    </svg>
  );
}
