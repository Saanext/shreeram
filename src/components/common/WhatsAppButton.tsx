
import Link from 'next/link';
import { cn } from '@/lib/utils';

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={cn("w-8 h-8", className)}
        >
            <path
                fill="#fff"
                d="M4.868,43.323l2.845-9.962A18.9,18.9,0,1,1,24.1,45.132h0l0,0A18.863,18.863,0,0,1,7.823,41.2l-10.02,2.864"
                transform="translate(-4.999 -4.999)"
            ></path>
            <path
                fill="#40c351"
                d="M24,48A24,24,0,1,1,48,24,24,24,0,0,1,24,48Z"
            ></path>
            <path
                fill="#fff"
                d="M36.177,32.3c-.215-.107-1.266-.624-1.462-.7-2.179-.852-3.373-1.46-4.9-2.071-.307-.123-.553-.185-.8.185-.246.369-.933,1.171-1.144,1.417s-.421.277-.776.1A12.754,12.754,0,0,1,21.9,28.2a15.2,15.2,0,0,1-3.618-4.223.541.541,0,0,1-.031-.5,3.7,3.7,0,0,1,.447-.585c.185-.215.369-.4.554-.616a.916.916,0,0,0,.093-.185.586.586,0,0,0-.031-.554c-.123-.185-.8-1.91-.986-2.433s-.369-.431-.524-.431h-.369a1.076,1.076,0,0,0-.77.369c-.277.307-1.047,1.016-1.047,2.463s1.078,2.864,1.232,3.079.185,2.925,4.373,6.222,4.62,2.8,6.867,3.618c.955.339,1.817.277,2.463.154a4.451,4.451,0,0,0,2.8-1.941,3.637,3.637,0,0,0,.246-1.971c-.092-.093-.246-.185-.462-.308Z"
            ></path>
        </svg>
    )
}


export function WhatsAppButton() {
    const phoneNumber = '+911234567890'; // Replace with your WhatsApp number
    const message = 'Hello! I saw your website and I have a question.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Link 
            href={whatsappUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Chat with us on WhatsApp"
        >
            <WhatsAppIcon />
        </Link>
    );
}
