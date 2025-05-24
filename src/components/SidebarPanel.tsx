'use client'

import {
  FaComments,
  FaTags,
  FaChartBar,
  FaList,
  FaBullhorn,
  FaProjectDiagram,
  FaClipboard,
  FaImage,
  FaRandom,
  FaCog,
  FaPuzzlePiece,
  FaInfoCircle,
} from 'react-icons/fa'
import { IoMdHome } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoTicket } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { FaListUl } from "react-icons/fa";

import { TiFlowMerge } from "react-icons/ti";
import { BiSolidImage } from "react-icons/bi";

import { MdChecklist } from "react-icons/md";
import { TbStarsFilled } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";


import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default function SidebarPanel() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const iconSize = 20

  return (
    <div className="flex flex-col items-center bg-white border-r p-2 space-y-5 h-screen w-16 justify-between">
      {/* Top avatar/logo */}
      <div className="flex flex-col items-center space-y-5">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
          {/* Replace with your logo or initials */}
          P2
        </div>

        <IconBtn icon={IoMdHome} label="Home" />
        <IconBtn icon={IoChatbubbleEllipsesSharp} label="Chats" />
        <IconBtn icon={IoTicket} label="Tags" />
        <IconBtn icon={GoGraph} label="Analytics" />
        <IconBtn icon={FaListUl} label="List" />
        <IconBtn icon={FaBullhorn} label="Announcements" />
        <IconBtn icon={TiFlowMerge} label="Projects" />
        <IconBtn icon={FaClipboard} label="Clipboard" />
        <IconBtn icon={BiSolidImage} label="Media" />
        <IconBtn icon={MdChecklist} label="Workflow" />
        <IconBtn icon={IoIosSettings} label="Settings" />

      </div>

      {/* Bottom section */}
      <div className="flex flex-col items-center space-y-4 mb-4">
        <IconBtn icon={TbStarsFilled} label="Extensions" />
        <IconBtn icon={FaInfoCircle} label="About / Info" />
      </div>
    </div>
  )
}

function IconBtn({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button
      className="text-gray-500 hover:text-green-500 transition"
      title={label}
    >
      <Icon size={18} />
    </button>
  )
}
