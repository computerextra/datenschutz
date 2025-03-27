import { setInitialData } from "@/hooks/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createUser } from "@/api/user";

const Firmen = ["Computer Extra GmbH", "AEM Communication GmbH & Co. KG"];
const Standorte = [
  "Alsfeld",
  "Grünberg",
  "Schotten",
  "Schwalmstadt",
  "Nidda",
  "Bad Arolsen",
  "Fritzlar",
  "Melsungen",
  "Kassel",
];

const formSchema = z.object({
  Name: z.string().min(2, {
    message: "Es muss ein Name eingegeben werden.",
  }),
  Email: z.string().email({
    message: "Es muss eine gültige E-Mail-Adresse eingegeben werden.",
  }),
  Firma: z.string(),
  Standort: z.string(),
});

function UserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await createUser(
      values.Name,
      values.Email,
      values.Firma,
      values.Standort,
    );
    if (data == null) return;
    setInitialData(data.Name, data.Email, data.Firma, data.Standort);
    location.reload();
  }

  return (
    <div className="container mx-auto mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dein Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Dein Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deine Geschäftliche Mail Adresse</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="dein.name@deine-firme.de"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Firma"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deine Firma</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wähle deine Firma" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Firmen.sort().map((firma) => (
                      <SelectItem key={firma} value={firma}>
                        {firma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Standort"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dein Standort</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bitte wähle deinen Standort" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Standorte.sort().map((firma) => (
                      <SelectItem key={firma} value={firma}>
                        {firma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Beginnen</Button>
        </form>
      </Form>
    </div>
  );
}

const loginFormSchema = z.object({
  Email: z.string().email({
    message: "Es muss eine gültige E-Mail-Adresse eingegeben werden.",
  }),
});

function Login() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // TODO: Get data from the server

    // TODO: Check if user exists
    // If not, show a toast message
    toast("Benutzer nicht gefunden", {
      action: {
        label: "Registrieren",
        onClick: () => {
          location.reload();
        },
      },
    });
    // Else set the user data
    setInitialData(
      "Max Mustermann",
      values.Email,
      "Computer Extra GmbH",
      "Kassel",
    );

    // location.reload();
  }

  return (
    <div className="container mx-auto mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deine Geschäftliche Mail Adresse</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="dein.name@deine-firme.de"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Anmelden</Button>
        </form>
      </Form>
    </div>
  );
}

export { Login, UserForm };
