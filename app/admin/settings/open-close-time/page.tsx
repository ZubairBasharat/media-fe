"use client"
import useToast from "@/components/hooks/useToast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGetUserInfoQuery } from "@/store/features/Website/Signup/SignUpApiSlice"
import { useRestaurantOpeningClosingTimeListQuery, useRestaurantOpeningClosingTimeMutation } from "@/store/features/admin/restaurants/restaurantApiSlice"
import useAuthStore from "@/store/zustand/auth"
import { Minus, Plus, User } from "lucide-react"
import { useEffect, useState } from "react"
import 'react-clock/dist/Clock.css'
import TimePicker from "react-time-picker"
import 'react-time-picker/dist/TimePicker.css'

const Profile = () => {
  const { ToastSuccess, ToastError } = useToast();
  const user = useAuthStore((state: any) => state.user)
  const userData = useGetUserInfoQuery(user?.user)
  const [selectedFile, setSelectedFile] = useState<any>()
  const [preview, setPreview] = useState()
  const [img, setImg] = useState<any>();
  const [openingClosingTimeSave] = useRestaurantOpeningClosingTimeMutation();
  const { data: openingClosingTimeList } = useRestaurantOpeningClosingTimeListQuery();
  const [message, setMessage] = useState("");

  const [saturday, setSaturday] = useState<any>([
    {
      day: "saturday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [sunday, setSunday] = useState<any>([
    {
      day: "sunday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [monday, setMonday] = useState<any>([
    {
      day: "monday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [tuesday, setTuesday] = useState<any>([
    {
      day: "tuesday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [wednesday, setWednesday] = useState<any>([
    {
      day: "wednesday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [thursday, setThursday] = useState<any>([
    {
      day: "thursday",
      opening_time: "",
      closing_time: ""
    }
  ]);
  const [friday, setFriday] = useState<any>([
    {
      day: "friday",
      opening_time: "",
      closing_time: ""
    }
  ]);

  useEffect(() => {
    const scheduleList = typeof openingClosingTimeList?.[0]?.schedule === "string" ? JSON.parse(openingClosingTimeList?.[0]?.schedule) : (openingClosingTimeList?.[0]?.schedule || []);
    const satudayDataFind = scheduleList?.filter((item: any) => item?.day === "saturday");
    const sundayDataFind = scheduleList?.filter((item: any) => item?.day === "sunday");
    const mondayDataFind = scheduleList?.filter((item: any) => item?.day === "monday");
    const tuesdayDataFind = scheduleList?.filter((item: any) => item?.day === "tuesday");
    const wednesdayDataFind = scheduleList?.filter((item: any) => item?.day === "wednesday");
    const thursdayDataFind = scheduleList?.filter((item: any) => item?.day === "thursday");
    const fridayDataFind = scheduleList?.filter((item: any) => item?.day === "friday");
    setMessage(openingClosingTimeList?.[0]?.message || "");

    if (satudayDataFind?.length) {
      setSaturday(satudayDataFind);
    }
    if (sundayDataFind?.length) {
      setSunday(sundayDataFind);
    }
    if (mondayDataFind?.length) {
      setMonday(mondayDataFind);
    }
    if (tuesdayDataFind?.length) {
      setTuesday(tuesdayDataFind);
    }
    if (wednesdayDataFind?.length) {
      setWednesday(wednesdayDataFind);
    }
    if (thursdayDataFind?.length) {
      setThursday(thursdayDataFind);
    }
    if (fridayDataFind?.length) {
      setFriday(fridayDataFind);
    }
  }, [openingClosingTimeList]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }
    const objectUrl: any = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    const data = new FileReader()
    data.addEventListener('load', () => {
      setImg(data.result)
    })
    data.readAsDataURL(e.target.files[0])
    setSelectedFile(e.target.files[0])
  }

  const saveOpeningClosingTime = async () => {
    const times = saturday.concat(sunday, monday, tuesday, wednesday, thursday, friday)
    const data = {
      restaurant_id: user?.user,
      schedule: JSON.stringify(times),
      message: message
    };

    try {
      await openingClosingTimeSave(data).unwrap()
        .then((res) => {
          console.log("res ", res);
          if (res.code === 200 || res.code === 201) {
            ToastSuccess("Created Successfully");
          }

          if (res?.error?.data?.message) {
            ToastError(res?.error?.data?.message)
          }
        })
        .catch((err: any) => {
          if (err?.data?.message) {
            ToastError(err?.data?.message)
          }
        })
    } catch (error) { }
  };

  return (
    <div>
      {/* header section start */}
      <div className=" h-[300px]">
        <div className=" profile_header_wrapper relative">
          <div className=" absolute bottom-12 left-12 flex items-center gap-6">
            {/* <img src="/assets/images/homepage/grocery-bag.jpg" alt="profile pic" className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" /> */}
            <Label className=" h-[150px] w-[150px] cursor-pointer rounded-full border-0 bg-gray-300 ">
              <input type='file' onChange={onSelectFile} className=" hidden h-[150px] w-[150px] border-0 bg-gray-300 p-10" />

              {
                selectedFile ?
                  <img src={preview} alt='uploded image' className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                  : <>
                    {
                      userData?.data?.image ?
                        <img src={`${process.env.IMAGE_URL}${userData?.data?.image}`} alt='uploded image' className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                        :
                        <User className=" h-[150px] w-[150px] rounded-full border-2 border-solid border-[#fff]" />
                    }

                  </>
              }

            </Label>
            <div>
              <h1 className=" text-[35px] font-bold text-[#fff]">{userData?.data?.name}</h1>
              <p className=" text-[white]">We are open 24/7</p>
            </div>
          </div>
        </div>
      </div>
      {/* header section end */}

      {/* body start  */}
      <div className=" bg-[#f8f9fa] p-8">
        <div className=" rounded-md bg-white p-4 shadow-md">
          <div className="space-y-6">
            <h4 className=" text-[18px] font-semibold">Set Opening and Closing Time</h4>
            <RadioGroup defaultValue="comfortable">
              <h5>Closing Message</h5>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pre-Order" id="r1" onClick={() => {
                  setMessage("Pre-Order");
                }} checked={message === "Pre-Order"}
                />
                <Label htmlFor="r1">Pre-Order</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Close" id="r2" onClick={() => {
                  setMessage("Close");
                }} checked={message === "Close"}
                />
                <Label htmlFor="r2">Close</Label>
              </div>
            </RadioGroup>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Saturday</Label>
              {saturday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newSaturday = [...saturday];
                        newSaturday[index] = {
                          ...newSaturday[index],
                          opening_time: value
                        };
                        setSaturday(newSaturday);
                      }} value={saturday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newSaturday = [...saturday];
                        newSaturday[index] = {
                          ...newSaturday[index],
                          closing_time: value
                        };
                        setSaturday(newSaturday);
                      }} value={saturday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newSaturday = [...saturday];
                          newSaturday.splice(index, 1);
                          setSaturday(newSaturday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newSaturday = [...saturday];
                          newSaturday.push({
                            day: "saturday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setSaturday(newSaturday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Sunday</Label>
              {sunday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newSunday = [...sunday];
                        newSunday[index] = {
                          ...newSunday[index],
                          opening_time: value
                        };
                        setSunday(newSunday);
                      }} value={sunday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newSunday = [...sunday];
                        newSunday[index] = {
                          ...newSunday[index],
                          closing_time: value
                        };
                        setSunday(newSunday);
                      }} value={sunday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newSunday = [...sunday];
                          newSunday.splice(index, 1);
                          setSunday(newSunday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newSunday = [...sunday];
                          newSunday.push({
                            day: "sunday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setSunday(newSunday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Monday</Label>
              {monday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newMonday = [...monday];
                        newMonday[index] = {
                          ...newMonday[index],
                          opening_time: value
                        };
                        setMonday(newMonday);
                      }} value={monday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newMonday = [...monday];
                        newMonday[index] = {
                          ...newMonday[index],
                          closing_time: value
                        };
                        setMonday(newMonday);
                      }} value={monday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newMonday = [...monday];
                          newMonday.splice(index, 1);
                          setMonday(newMonday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newMonday = [...monday];
                          newMonday.push({
                            day: "monday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setMonday(newMonday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Tuesday</Label>
              {tuesday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newTuesday = [...tuesday];
                        newTuesday[index] = {
                          ...newTuesday[index],
                          opening_time: value
                        };
                        setTuesday(newTuesday);
                      }} value={tuesday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newTuesday = [...tuesday];
                        newTuesday[index] = {
                          ...newTuesday[index],
                          closing_time: value
                        };
                        setTuesday(newTuesday);
                      }} value={tuesday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newTuesday = [...tuesday];
                          newTuesday.splice(index, 1);
                          setTuesday(newTuesday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newTuesday = [...tuesday];
                          newTuesday.push({
                            day: "tuesday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setTuesday(newTuesday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Wednesday</Label>
              {wednesday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newWednesday = [...wednesday];
                        newWednesday[index] = {
                          ...newWednesday[index],
                          opening_time: value
                        };
                        setWednesday(newWednesday);
                      }} value={wednesday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newWednesday = [...wednesday];
                        newWednesday[index] = {
                          ...newWednesday[index],
                          closing_time: value
                        };
                        setWednesday(newWednesday);
                      }} value={wednesday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newWednesday = [...wednesday];
                          newWednesday.splice(index, 1);
                          setWednesday(newWednesday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newWednesday = [...wednesday];
                          newWednesday.push({
                            day: "wednesday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setWednesday(newWednesday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Thursday</Label>
              {thursday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newThursday = [...thursday];
                        newThursday[index] = {
                          ...newThursday[index],
                          opening_time: value
                        };
                        setThursday(newThursday);
                      }} value={thursday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newThursday = [...thursday];
                        newThursday[index] = {
                          ...newThursday[index],
                          closing_time: value
                        };
                        setThursday(newThursday);
                      }} value={thursday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newThursday = [...thursday];
                          newThursday.splice(index, 1);
                          setThursday(newThursday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newThursday = [...thursday];
                          newThursday.push({
                            day: "thursday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setThursday(newThursday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-4 p-8">
              <Label className="mx-auto mb-2 block text-center font-bold">Friday</Label>
              {friday?.map((day: string, index: number) =>
                <div className="mx-auto grid grid-cols-12 items-center justify-center text-center">
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Opening Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newFriday = [...friday];
                        newFriday[index] = {
                          ...newFriday[index],
                          opening_time: value
                        };
                        setFriday(newFriday);
                      }} value={friday[index].opening_time} />
                  </div>
                  <div className="col-span-4">
                    <Label className="mr-2 text-center">Closing Time</Label>
                    <TimePicker
                      disableClock
                      onChange={(value: any) => {
                        const newFriday = [...friday];
                        newFriday[index] = {
                          ...newFriday[index],
                          closing_time: value
                        };
                        setFriday(newFriday);
                      }} value={friday[index].closing_time}
                    />
                  </div>
                  <div className="col-span-4">
                    <div className=" flex items-center justify-start gap-2">
                      <Button
                        type="button"
                        className="mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        onClick={() => {
                          const newFriday = [...friday];
                          newFriday.splice(index, 1);
                          setFriday(newFriday);
                        }}
                      >
                        <Minus />
                      </Button>
                      <Button
                        className=" mt-2 w-full rounded-md bg-[#00ccbb] p-[9px] text-center text-white md:w-[30px]"
                        type="button"
                        onClick={() => {
                          const newFriday = [...friday];
                          newFriday.push({
                            day: "friday",
                            opening_time: "",
                            closing_time: ""
                          });
                          setFriday(newFriday);
                        }}
                      >
                        <div className=" flex items-center justify-center">
                          <Plus className=" h-[20px] w-[20px]" />
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" flex items-center  justify-end">
              <Button className="inline-block w-[120px]" type="button" onClick={saveOpeningClosingTime}>Save</Button>
            </div>
          </div>
        </div>
      </div>
      {/* body end  */}

    </div>
  )
}

export default Profile
