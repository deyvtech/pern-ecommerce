import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export default function EditProductForm({openDrawer, setOpenDrawer }: {openDrawer: boolean, setOpenDrawer: (prev: (prev: boolean) => boolean) => void}) {



  return (
    <Drawer direction="right" open={openDrawer} dismissible={true} onOpenChange={() => setOpenDrawer((prev) => !prev)} >
      <DrawerContent className="py-6">
        <DrawerHeader>
          <DrawerTitle>Wireless Over-Ear Headphones</DrawerTitle>
          <DrawerDescription>Please edit the details of the product below.</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">
            
        </div>
        <DrawerFooter>
          <Button size="lg" className="cursor-pointer">Submit</Button>
          <DrawerClose asChild>
            <Button size="lg" variant="outline" className="cursor-pointer" onClick={() => setOpenDrawer(() => true)}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
