import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select"

type DeliveryMethodSelectionType = {
    field: any
}

export const DeliveryMethodSelection = ({field}: DeliveryMethodSelectionType) => {
    return <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className="w-full p-5 py-6">
            <SelectValue placeholder="Liefermethode" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Liefermethode</SelectLabel>
                <SelectItem value="pickup">Nur Abholung</SelectItem>
                <SelectItem value="deliver">Nur Lieferung</SelectItem>
                <SelectItem value="both">Abholung und Lieferung</SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
}