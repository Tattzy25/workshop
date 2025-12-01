"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { IconSearch, IconFile, IconHome, IconSettings, IconUser } from "@tabler/icons-react"

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium">Documents</h1>
          <div className="mx-auto flex max-w-md flex-1 items-center justify-center py-[3px]">
            <InputGroup className="min-h-[35px] cursor-pointer" onClick={() => setOpen(true)}>
              <InputGroupAddon align="inline-start">
                <IconSearch className="size-4" />
              </InputGroupAddon>
              <InputGroupInput 
                placeholder="Search..." 
                readOnly
                className="cursor-pointer"
              />
              <InputGroupAddon align="inline-end">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => { window.location.href = '/'; setOpen(false) }}>
              <IconHome className="size-4" />
              <span>Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/dashboard'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Dashboard</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/workshop'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Workshop</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/testshop'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Testshop</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/embedded'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Embedded</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/metadata'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Metadata</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/indexed'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Indexed</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/workflow'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Workflow</span>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/showroom'; setOpen(false) }}>
              <IconFile className="size-4" />
              <span>Showroom</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => { window.location.href = '/settings'; setOpen(false) }}>
              <IconSettings className="size-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => { window.location.href = '/profile'; setOpen(false) }}>
              <IconUser className="size-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
