import Logo from "@/assets/images/logo.svg"
import PageHeader from "@/components/elements/page-header"

import Image from "next/image"

export default function Header() {

    return (
        <section className="px-2">
            <Image
                src={Logo}
                alt="Company Logo"
                className="md:hidden"

                priority
            />
            <div className="mt-9 pb-4 border-b border-foreground/10">
                <PageHeader
                    pageTitle='Course'
                />
            </div>
        </section>
    )
}
