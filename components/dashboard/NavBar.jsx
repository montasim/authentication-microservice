import React from 'react';

import { Card } from '@/components/ui/card';

import { ColorToggle } from '@/components/theme/ColorToggle';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function NavBar() {
    return (
        <Card className="flex items-center justify-between p-2 bg-card text-card-foreground border-b border-x-0 border-t-0 rounded-none space-x-4">
            <div className="flex items-center justify-between space-x-4">
                <Avatar>
                    <AvatarImage
                        src="https://avatars.githubusercontent.com/u/95298623?v=4"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <strong className="font-roboto uppercase font-semibold">
                    Configuration Dashboard
                </strong>
            </div>

            <div className="flex items-center justify-between space-x-4">
                <ColorToggle />

                <ModeToggle />
            </div>
        </Card>
    );
}
