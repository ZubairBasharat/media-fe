"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useFormContext } from "react-hook-form"

export function FormAutoComplete({ name, singleListName, data, ...otherProps }: any) {

    const { control, setValue } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{otherProps?.label}</FormLabel>
                    <Popover>
                        <div className="w-full">
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value
                                            ? data?.find(
                                                (item: any) => item.id?.toString() == field.value?.toString()
                                            )?.[`${singleListName}`]
                                            : "Select"}

                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-100 p-0">
                                <Command>
                                    <CommandInput
                                        placeholder="Search..."
                                        className="h-9"
                                    />
                                    <CommandEmpty>Not found.</CommandEmpty>
                                    <ScrollArea className="h-80 rounded-md border">
                                        <CommandGroup>
                                            {data?.map((item: any) => (
                                                <CommandItem
                                                    className="cursor-pointer"
                                                    value={item.id}
                                                    key={item.id}
                                                    onSelect={(value: any) => {
                                                        setValue(name, item.id?.toString())

                                                    }}
                                                >
                                                    {item?.[`${singleListName}`]}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            item.id?.toString() === field.value?.toString()
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </ScrollArea>
                                </Command>
                            </PopoverContent>
                        </div>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
